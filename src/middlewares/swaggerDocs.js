import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/path/constants.js';
import swaggerUI from 'swagger-ui-express';
import createHttpError from 'http-errors';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    console.log(err);
    return (req, res, next) => next(createHttpError(500, "Can't load swagger docs"));
  }
};
