import logging from "./logging";

class KeybindManager {
  keybinds = {};
  manualProcessers = [];

  addGlobalListener() {
    window.addEventListener("keydown", (e) => {
      this.keyPressed(e);
    })
  }
  
  registerKeybind(key, callback) {
    // Check if the key parameter is a KeyListener or another type
    if(key instanceof KeyListener) {
      // Create the array if it doesn't exist
      if(!this.keybinds[key.key]) {
        this.keybinds[key.key] = [];
      }
      
      // Set the listener and push it into the respective arrays
      key.setListener(callback);
      this.keybinds[key.key].push(key);
      
      if(key.upper) {
        if(!this.keybinds[key.key.toUpperCase()]) {
          this.keybinds[key.key.toUpperCase()] = [];
        }
        this.keybinds[key.key.toUpperCase()].push(key);
      }
      logging.log('KeybindManager', `Registered Complex Keybind ${key.key}`, 'success', key);
    } else {
      // Create the array if it doesn't exist
      if(!this.keybinds[key]) {
        this.keybinds[key] = [];
      }
      
      const tempListener = new KeyListener(key);
      tempListener.setListener(callback);
      
      this.keybinds[key].push(tempListener);
      logging.log('KeybindManager', `Registered Basic Keybind ${tempListener.key}`, 'success');
    }
  }
  // Alias for registerKeybind
  $on(key, callback) {
    this.registerKeybind(key, callback);
  }

  registerManualProcessor(callback) {
    logging.log('KeybindManager', `Registering Manual Processor ${this.manualProcessers.length}`, 'success')
    this.manualProcessers.push(callback);
  }
  $addProcessor(callback) {
    this.registerManualProcessor(callback);
  }
  
  // Call Listeners
  keyPressed(e) {
    if (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT') return;

    for(const processor of this.manualProcessers) {
      processor(e);
    }

    if(!this.keybinds[e.key] || e.defaultPrevented) return;

    for(const listener of this.keybinds[e.key]) {
      if(listener.debounce && e.repeat) continue;
      if(listener.shift && !e.shiftKey) continue;
      if(listener.ctrl && !e.ctrlKey) continue;

      listener.listener();
    }
  }

}

// Key listener class
export class KeyListener {
  key;
  debounce;
  shift;
  ctrl;
  upper;

  listener;

  constructor(key, debounce, shift, ctrl, upper) {
    if(!key) {
      logging.log('KeybindManager', 'Unable to register a KeyListener with no key!', 'error');
      return;
    }

    this.key = key;
    this.debounce = debounce || true;
    this.shift = shift || false;
    this.ctrl = ctrl || false;
    this.upper = upper || false;
  }

  setListener(listener) {
    this.listener = listener;
  }
}
// Vue plugin installation
export default {
  install(Vue) {
    const manager = new KeybindManager();

    Vue.keybinds = manager;
    Vue.$keybinds = manager;

    Object.defineProperties(Vue.prototype, {
      keybinds: {
        get() {
          return manager;
        }
      },

      $keybinds: {
        get() {
          return manager;
        }
      }
    });

    manager.addGlobalListener();
  }
}
