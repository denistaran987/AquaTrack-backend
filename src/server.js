import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { ENV_VAR } from './constants/env/constants.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const allowedOrigins = [
  'https://aquatrack-app.vercel.app',
  'https://aqua-track-client.vercel.app',
  'http://localhost:5174',
  'http://localhost:5173',
  'http://localhost:5172',
];

const PORT = +getEnvVar(ENV_VAR.MONGODB_PORT, 3000);

export const setupServer = () => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );

  app.use(router);
  app.use('/api-docs', swaggerDocs());

  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
