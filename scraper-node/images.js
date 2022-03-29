import { get } from 'https';
import sizeOf from 'image-size';

export const getImageSize = (url) => {
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      const chunks = [];
      response
        .on('data', (chunk) => {
          chunks.push(chunk);
        })
        .on('end', () => {
          const buffer = Buffer.concat(chunks);
          const dimensions = sizeOf(buffer);
          resolve(dimensions);
        });
    });
  });
};
