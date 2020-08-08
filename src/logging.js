/* eslint-disable */
function log(component, message, type) {
  if(process.env.NODE_ENV !== 'development' && component !== 'Build') {
      return;
  }

  let set = {
      background: null,
      color: null
  };
  if(type == null) {
      set.background = '#ffcd00';
      set.color = '#000';
  } else {
      switch(type) {
          case 'error':
              set.background = '#c0392b';
              set.color = '#fff';
              break;
          case 'warn':
              set.background = '#d35400';
              set.color = '#fff';
              break;
          case 'success':
              set.background = '#2ecc71';
              set.color = '#000';
              break;
          default:
              set = type;
      }
  }


  console.log(`%c ${component} %c ${message} `,`background: ${set.background}; color: ${set.color}; border-radius: 3px 0 0 3px;`, "background: #333; color: #fff; border-radius: 0 3px 3px 0;");
}

export default {
  methods: {
      log,
  },
  log,
};