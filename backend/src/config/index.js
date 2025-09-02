require('dotenv').config();
const { cleanEnv, str, port, url } = require('envalid');

const config = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGO_URI: url(),
  CORS_ORIGINS: str({ default: '*' }),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  LOG_LEVEL: str({ default: 'info', choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] })
});

module.exports = config;