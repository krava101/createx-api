export const customPathCloudinary = (img) =>
  `/${img.asset_folder}/${img.original_filename.split(".")[0]}`;