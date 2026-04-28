import multer from "multer";
import { InvalidUploadMimeTypeError, UploadTooLargeError } from "../errors/upload.errors.js";

const storage = multer.memoryStorage();

function buildFileFilter(allowedMimeTypes = []) {
  return (_req, file, cb) => {
    if (!allowedMimeTypes.length || allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new InvalidUploadMimeTypeError());
  };
}

export function createSingleUploadMiddleware({
  fieldName,
  allowedMimeTypes = [],
  maxFileSize,
}) {
  const upload = multer({
    storage,
    limits: {
      fileSize: maxFileSize,
      files: 1,
    },
    fileFilter: buildFileFilter(allowedMimeTypes),
  }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, (error) => {
      if (error?.code === "LIMIT_FILE_SIZE") {
        next(new UploadTooLargeError());
        return;
      }

      next(error);
    });
  };
}
