import path from "path";
import fs from "fs/promises";

// export const clearTmpFolder = async (files) => {
//   const dir = path.resolve("tmp");
//   try {
//     const files = await fs.readdir(dir);
//     const unlinkPromises = files.map((file) => fs.unlink(path.join(dir, file)));
//     await Promise.all(unlinkPromises);
//   } catch (err) {
//     return new Error(err);
//   }
// };

export const clearTmpFolder = async (files) => {
  try {
    const unlinkPromises = files.map((file) =>
      fs.unlink(file.path).catch((err) => {
        console.error(`Error deleting file ${file.path}: ${err.message}`);
      })
    );
    await Promise.all(unlinkPromises);
  } catch (err) {
    throw new Error(`Error clearing files: ${err.message}`);
  }
};
