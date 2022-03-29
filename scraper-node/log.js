const LOG_PREFIX = '[deno-xkcd-scrapper]';
export const log = (...args) => console.log(LOG_PREFIX, ...args);
export const time = (string = '') => {
  console.time(`${LOG_PREFIX} ${string}`);
  return () => console.timeEnd(`${LOG_PREFIX} ${string}`);
};
