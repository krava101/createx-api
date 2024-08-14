import path from "path";
import fs from "fs/promises";

export const clearTmpFolder = async () => {
  const dir = path.resolve("tmp");
  try {
    const files = await fs.readdir(dir);
    const unlinkPromises = files.map((file) => fs.unlink(path.join(dir, file)));
    await Promise.all(unlinkPromises);
  } catch (err) {
    return new Error(err);
  }
};
