import path from "path";
import cloudinary from "../../../configs/cloudinary.js";
import { AssetUploadFailedError } from "../infrastructure/errors/upload.errors.js";

function streamUpload(buffer, options) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(new AssetUploadFailedError(error.message));
        return;
      }

      resolve(result);
    });

    uploadStream.end(buffer);
  });
}

function extractExtension(fileName = "") {
  const extension = path.extname(fileName).replace(".", "").trim().toLowerCase();
  return extension || undefined;
}

export class CloudinaryAssetService {
  async uploadAvatar({ userId, file }) {
    const uploaded = await streamUpload(file.buffer, {
      folder: `users/${userId}/avatars`,
      resource_type: "image",
      transformation: [
        { width: 256, height: 256, crop: "fill", gravity: "face" },
        { quality: "auto", fetch_format: "auto" },
      ],
      overwrite: true,
      invalidate: true,
    });

    return {
      secureUrl: cloudinary.url(uploaded.public_id, {
        secure: true,
        transformation: [
          { width: 256, height: 256, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" },
        ],
      }),
      publicId: uploaded.public_id,
      resourceType: uploaded.resource_type,
      bytes: uploaded.bytes,
      width: uploaded.width,
      height: uploaded.height,
      format: uploaded.format,
      originalFileName: file.originalname,
      mimeType: file.mimetype,
    };
  }

  async uploadCompanyLogo({ companyId, file }) {
    const uploaded = await streamUpload(file.buffer, {
      folder: `companies/${companyId}/logos`,
      resource_type: "image",
      transformation: [
        { width: 512, height: 512, crop: "limit" },
        { quality: "auto", fetch_format: "auto" },
      ],
      overwrite: true,
      invalidate: true,
    });

    return {
      secureUrl: cloudinary.url(uploaded.public_id, {
        secure: true,
        transformation: [
          { width: 512, height: 512, crop: "limit" },
          { quality: "auto", fetch_format: "auto" },
        ],
      }),
      publicId: uploaded.public_id,
      resourceType: uploaded.resource_type,
      bytes: uploaded.bytes,
      width: uploaded.width,
      height: uploaded.height,
      format: uploaded.format,
      originalFileName: file.originalname,
      mimeType: file.mimetype,
    };
  }

  async uploadMessageAttachment({ channelId, file }) {
    const isImage = file.mimetype.startsWith("image/");
    const uploaded = await streamUpload(file.buffer, {
      folder: `messages/${channelId}/${isImage ? "images" : "files"}`,
      resource_type: isImage ? "image" : "raw",
      resource_type_analysis: true,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      invalidate: false,
      format: isImage ? undefined : extractExtension(file.originalname),
      transformation: isImage
        ? [{ width: 1600, height: 1600, crop: "limit" }, { quality: "auto", fetch_format: "auto" }]
        : undefined,
    });

    return {
      kind: isImage ? "image" : "file",
      secureUrl: isImage
        ? cloudinary.url(uploaded.public_id, {
            secure: true,
            transformation: [
              { width: 1600, height: 1600, crop: "limit" },
              { quality: "auto", fetch_format: "auto" },
            ],
          })
        : uploaded.secure_url,
      publicId: uploaded.public_id,
      resourceType: uploaded.resource_type,
      fileName: file.originalname,
      fileSize: uploaded.bytes,
      mimeType: file.mimetype,
      format: uploaded.format || extractExtension(file.originalname),
      width: uploaded.width,
      height: uploaded.height,
    };
  }

  async deleteAsset({ publicId, resourceType = "image" }) {
    if (!publicId) return null;
    return cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
  }
}
