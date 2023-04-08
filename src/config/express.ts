import express from 'express';
import cors from 'cors';
import rootRoute from '@routes/index';
import errorHandler from './expressError';
import expressNotFound from './expressNotFound';
import expressLogger from './expressLogger';
const origins = process.env.ORIGINS?.split(',') || []; 

const createServer = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(expressLogger);
  if (origins.length > 0) {
    app.use(cors(
      {
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          if (origins.indexOf(origin) === -1) {
            const msg = 'La aplicacion no tiene permiso para acceder a este ';
            return callback(new Error(msg), false);
          }
          return callback(null, true)
        }
      }
    ));
  } else {

  }

  app.use(express.json());
  app.disable('x-powered-by');
  app.use('/', rootRoute);
  app.use(expressNotFound);
  app.use(errorHandler);
  return app;
};

export { createServer };
