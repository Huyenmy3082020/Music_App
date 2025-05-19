// src/helper/file-filter.util.ts

import { Request } from 'express';
import { extname } from 'path';

/**
 * Lọc file tải lên: chỉ cho phép file ảnh (jpeg, png, gif, webp, ...)
 */
export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return callback(
      new Error('Chỉ cho phép tải lên các tệp hình ảnh (jpg, jpeg, png, gif, webp)'),
      false,
    );
  }
  callback(null, true);
};
