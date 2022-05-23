const LOG_PREFIX = '[deno-xkcd-updater-algolia]';
const log = (...args) => console.log(LOG_PREFIX, ...args);
const logerror = (...args) => console.error(LOG_PREFIX, ...args);
const time = (string = '') => {
  console.time(`${LOG_PREFIX} ${string}`);
  return () => console.timeEnd(`${LOG_PREFIX} ${string}`);
};

module.exports = {
  log,
  logerror,
  time,
};
