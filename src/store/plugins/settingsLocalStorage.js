export default function createLocalStoragePlugin({ moduleName, localStorageName }) {
  return store => {
    const loader = localStorage.getItem(localStorageName);
    if(loader !== null) {
      store.state[moduleName] = JSON.parse(loader);
    }

    store.subscribe((mutation) => {
      if(!mutation.type.startsWith(moduleName)) return;

      localStorage.setItem(localStorageName, JSON.stringify(store.state[moduleName]));
    });
  }
}