import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "path";
import fs from "fs/promises";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Upload cover image
    const coverImage = files.coverImage[0];
    const coverImagePath = path.join(
      __dirname,
      "../../public/data/uploads",
      coverImage.filename
    );
    const coverImageResult = await uploadToCloudinary(coverImagePath, {
      folder: "book-covers",
      format: coverImage.mimetype.split("/").at(-1),
    });

    // Upload book file
    const bookFile = files.file[0];
    const bookFilePath = path.join(
      __dirname,
      "../../public/data/uploads",
      bookFile.filename
    );
    const bookFileResult = await uploadToCloudinary(bookFilePath, {
      resource_type: "raw",
      folder: "book-pdfs",
      format: "pdf",
    });

    console.log("Cover image upload result:", coverImageResult);
    console.log("Book file upload result:", bookFileResult);

    // Clean up uploaded files
    await Promise.all([fs.unlink(coverImagePath), fs.unlink(bookFilePath)]);

    res.json({ coverImage: coverImageResult, bookFile: bookFileResult });
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, "Error while uploading file"));
  }
};

const uploadToCloudinary = async (filePath: string, options: any) => {
  const fileContent = await fs.readFile(filePath);
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(fileContent);
  });
};

export { createBook };
