import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

async function uploadImagesFromTmp(files, folder) {
  const uploadPromises = files.map(({ path, filename }) => {
    return cloudinary.uploader
      .upload(path, {
        folder,
        public_id: filename.split(".")[0],
      })
      .then((result) => {
        return fs.unlink(path).then(() => result);
      })
      .catch((e) => {
        return fs.unlink(path).then(() => Promise.reject(e));
      });
  });

  const uploadedImages = await Promise.all(uploadPromises);
  return uploadedImages;
}

export default uploadImagesFromTmp;
