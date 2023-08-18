import express from 'express';
import cors from 'cors';
import rootRoute from '@routes/index';
import errorHandler from './expressError';
import expressNotFound from './expressNotFound';
import expressLogger from './expressLogger';

//const origins = process.env.ORIGINS?.split(',') || []; 


// Opciones de CORS más avanzadas
const corsOptions = {
  origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type', 'apikey'],
};

const createServer = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(expressLogger);
  app.use(cors(corsOptions));
  app.use(express.json());
  app.disable('x-powered-by');
  app.use('/', rootRoute);
  app.use(expressNotFound);
  app.use(errorHandler);
  return app;
};

export { createServer };
