const LOG_PREFIX = '[deno-xkcd-scrapper]';
export const log = (...args: any[]) => console.log(LOG_PREFIX, ...args);
export const time = (string: string = '') => {
  console.time(`${LOG_PREFIX} ${string}`);
  return () => console.timeEnd(`${LOG_PREFIX} ${string}`);
};
