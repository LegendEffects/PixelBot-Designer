import logging from "../../logging";

export default function createLocalStoragePlugin({ moduleName, localStorageName }) {
  return store => {
    const loader = localStorage.getItem(localStorageName);
    const version = store.state[moduleName].version || 0;

    
    if(loader !== null) {
      const parsed = JSON.parse(loader);
      if(version > (parsed.version || -1)) {
        localStorage.removeItem(localStorageName);
        logging.log('LocalStorageManager', `Deleting storage for ${localStorageName}(${parsed.version}) production version is ${version}.`, 'warn');
      } else {
        store.state[moduleName] = parsed;
      }
    }

    store.subscribe((mutation) => {
      if(!mutation.type.startsWith(moduleName)) return;

      localStorage.setItem(localStorageName, JSON.stringify(store.state[moduleName]));
    });
  }
}