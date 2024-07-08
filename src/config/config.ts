import { config as conf } from "dotenv";
conf();
const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jwtsecret: process.env.JWT_SECRET,
  cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_SECRET_KEY,
};

export const config = Object.freeze(_config);
//freeze is used to make the values unchangable so that it cant be changed from other files
