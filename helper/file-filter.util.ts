// src/common/utils/file-filter.util.ts

import { extname } from 'path';
import { Request } from 'express';

// Extend the Request interface to include the fileValidationError property
declare module 'express-serve-static-core' {
  interface Request {
    fileValidationError?: string;
  }
}


export function imageFileFilter(req: Request, file: Express.Multer.File, cb: Function) {
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const ext = extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    req.fileValidationError = `Wrong extension type. Accepted file extensions are: ${allowedExtensions.join(', ')}`;
    return cb(null, false);
  }

  const fileSize = parseInt(req.headers['content-length'] || '0', 10);

  if (fileSize > 5 * 1024 * 1024) { // > 5MB
    req.fileValidationError = 'File size is too large. Accepted file size is less than 5 MB';
    console.log('File size exceeds the limit:', req.fileValidationError);
    return cb(null, false);
  }

  console.log('File is valid');
  cb(null, true);
}
