import fs from 'fs-extra';
import path from 'path';

export const getMostRecentFile = (dir) => {
  const files = orderReccentFiles(dir);
  return files.length ? files[0] : undefined;
};
const orderReccentFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .filter(
      (file) =>
        fs.lstatSync(path.join(dir, file)).isFile() && file !== 'index.json'
    )
    .sort((a, b) => b.localeCompare(a));
};
