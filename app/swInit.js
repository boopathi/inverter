import { observer } from "inferno-mobx";

export default function swInit() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js").then(reg => {
      console.log("SW Active");
      observer(({ purging }) => {
        if (purging && caches) {
          caches
            .keys()
            .then(keyList =>
              Promise.all(keyList.map(key => caches.delete(key))))
            .then(() => {
              console.log("all caches removed");
              store.completePurge();
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    });
  }
}
