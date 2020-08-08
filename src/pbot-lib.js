// Requires pako
// Probably should've made this its own node module

import Pako from 'pako';
import defaultPalette from './defaultPalette';

// Generate PixelMap
//
let final = []
for(let i=0;i<12;i++) {
  let row = [];
  for(let r=1;r<13;r++) row.push((i*12)+r);
  if(i % 2 === 1) final[i] = row.reverse();
  else final[i] = row;
}
const pixelMap = final.reverse();
//
// //

// Util
//
function encodeRLE(string) {
  let lastLetter = undefined;
  let currentCount = undefined;
  let output = '';
  for(let i=0;i<string.length;i++) {
      if(typeof lastLetter === 'undefined') {
          lastLetter = string[i];
          currentCount = 1;
          continue;
      }
      if(string[i] !== lastLetter) {
          output += currentCount+lastLetter;
          lastLetter = string[i];
          currentCount = 1;
          continue;
      }
      currentCount++;
  }
  return (output + (currentCount + lastLetter))
}
function decodeRLE(string) {
  return string.replace(/(\d+)([a-zA-A])/g, function (match, num, letter) {
      var ret = '', i;
      for (i = 0; i < parseInt(num, 10); i++) {
          ret += letter;
      }
      return ret;
  });
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
function chunk(arr, size) {
  return arr.reduce((chunks, el, i) => (i % size ? chunks[chunks.length - 1].push(el) : chunks.push([el])) && chunks, [])
}

function convertToSerpentine(grid, extendedPalette) {
  const palette = Object.assign({}, defaultPalette, extendedPalette);
  let string = [];

  for(let rowC = 0; rowC < Object.keys(grid).length; rowC++) {
    let row = grid[rowC];

    for(let colC = 0; colC < Object.keys(row).length; colC++) {
      let pixelId = pixelMap[rowC][colC];

      string[pixelId] = getKeyByValue(palette, grid[rowC][colC]);
    }
  }

  return encodeRLE(string.join(''));
}
function convertFromSerpentine(string, extendedPalette) {
  const palette = Object.assign({}, defaultPalette, extendedPalette);

  let array = [];
  let decoded = decodeRLE(string)
  
  for(let row of pixelMap) {
      let fRow = [];
      for(let column of row) {
        fRow.push(palette[decoded[column-1]]);
      }
      array.push(fRow);
  }
  return array;
}

function toGZip(str) {
  return new Buffer(Pako.gzip(str)).toString('base64');
}

function convertFrameToObject(frame) {
  let objFrame = [];
  for(const gridI in frame) {
    let objRows = [];
  
    for(const rowI in frame[gridI]) {
      objRows.push(Object.assign({}, frame[gridI][rowI]));
    }
    objFrame.push(Object.assign({}, objRows));
  }

  return Object.assign({}, objFrame);
}
//
// //

//
// IMPORTING
//

// Should return an object containing error, palette and frames
const importText = function(rawText) {
  // Get which command it is
  if(!rawText.startsWith('!')) {
    return {
      error: "Expected input to be a command."
    }
  }

  const text = rawText.substr(1, rawText.length);

  const body = text.split('.');
  const command = body.shift();

  switch(command) {
    case 'pbd':
      // Drawing - 4 Grids - Uncompressed
      return {
        error: false,
        palette: {},
        frames: [ importDrawing(body) ]
      };
    case 'pbdz':
      // Drawing - 4 Grids - Compresed
      return importCompressedDrawing(body);
    case 'pba':
      // Animation - 4 Grids - Uncompressed
      return importAnimation(body);
    case 'pbaz':
      // Animation - 4 Grids - Compressed
      return importCompressedAnimation(body);

    case 'pbdh':
      // Color Mapped Drawing - 4 Grids - Uncompressed
      return importColorMapDrawing(body);
    case 'pbdhz':
      // Color Mapped Drawing - 4 Grids - Uncompressed
      return importCompressedColorMapDrawing(body);
  }

  return {
    error: true
  }
}

function importDrawing(body, extendedPalette) {
  let final = {};

  for(const gridI in body) {
    final[gridI] = convertFromSerpentine(body[gridI], extendedPalette);
  }

  return final;
}
function importCompressedDrawing(body) {
  const inflated = Pako.inflate(new Buffer(body[0], 'base64'), {to: 'string'}).split('.');
  if(inflated !== 4) {
    return { error: true }
  }

  return {
    error: false,
    palette: {},
    frames: [ importDrawing(inflated) ]
  };
}

function importAnimation(body) {
  let final = {};
  const delay = body.shift();

  if(body.length % 4 !== 0) {
    return { error: true };
  }

  const frames = chunk(body, 4);
  for(let frameI in frames) {
    final[frameI] = importDrawing(frames[frameI]);
  }

  return {
    error: false,
    palette: {},
    frames: final,
    delay
  };
}
function importCompressedAnimation(body) {
  const inflated = Pako.inflate(new Buffer(body[0], 'base64'), {to: 'string'}).split('.');
  return importAnimation(inflated);
}

function importColorMapDrawing(body) {
  let colorMap = {};

  const colors = body.shift().split(',');
  for(const colorI in colors) {
    const color = colors[colorI];

    colorMap[color.charAt(0)] = color.substr(1, color.length);
  }

  return {
    error: false,
    palette: colorMap,
    frames: [ importDrawing(body, colorMap) ]
  }
}
function importCompressedColorMapDrawing(body) {
  return importColorMapDrawing(Pako.inflate(new Buffer(body[0], 'base64'), {to: 'string'}).split('.'));
}

//
// EXPORTING
//

// Expects the following array/object structure:
// Frame -> 4 Grids -> 12 Rows -> 12 Cells
// With each cell being an RGB hex value.
const exportAnimatedGrids = function(frames, rawPalette) {
  let final = [];

  for(let frame of Object.values(frames)) {
    let grids = [];

    // Convert the grids to serpentine pattern
    for(const grid of Object.values(frame)) {
      grids.push(convertToSerpentine(grid, rawPalette));
    }

    // Push the set of grids as a frame
    final.push(grids.join('.'));
  }

  return final;
}

const exportSingularGrids = function(frame, rawPalette) {
  let final = [];
  
  for(const grid of Object.values(frame)) {
    final.push(convertToSerpentine(grid, rawPalette));
  }

  return final;
}

const exportColorMapDrawing = function(frame, rawPalette) {
  const colors = [];
  for(const identifier in rawPalette) {
    colors.push(identifier + rawPalette[identifier])
  }

  return colors.join(',') + '.' + exportSingularGrids(frame, rawPalette).join('.');
}

export default {
  // Import TODO -- --
  importText,

  // Export
  exportAnimatedGrids,
  exportSingularGrids,
  exportColorMapDrawing,

  // Public Util
  toGZip,
  convertToSerpentine,
  convertFromSerpentine,
  convertFrameToObject
}