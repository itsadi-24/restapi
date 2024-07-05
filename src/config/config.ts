import { config as conf } from "dotenv";
conf();
const _config = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_CONNECTION_STRING,
};

export const config = Object.freeze(_config);
//freeze is used to make the values unchangable so that it cant be changed from other files