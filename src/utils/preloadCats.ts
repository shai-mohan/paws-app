import { cats } from "../data/cats";

export function preloadCats(): Promise<void> {
  return Promise.all(
    cats.map(
      cat =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = cat.url;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  ).then(() => undefined);
}
