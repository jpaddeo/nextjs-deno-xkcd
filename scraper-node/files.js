import fs from 'fs-extra';
import path from 'path';

export const getMostRecentFile = (dir) => {
  const files = orderReccentFiles(dir);
  return files.length ? files[0].file : undefined;
};
const orderReccentFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, ctime: fs.lstatSync(path.join(dir, file)).ctime }))
    .sort((a, b) => b.ctime.getTime() - a.ctime.getTime());
};
