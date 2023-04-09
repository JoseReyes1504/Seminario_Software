import express from 'express';
import { validateJwtMiddleWare } from './middlewares/jwtTokenValidator';
import {validateKeyMiddleWare} from './middlewares/apikeyValidator';
const router  = express.Router();

// http://localhost:3001
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

// http://localhost:3001/version
router.get('/version', (_req, res)=>{
  const version: string = "1.0.0";
  const jsonResp = {"name":"FODA Be", "version": version};
  // string, number, boolean, types, interfaces, classes, enumerators
  res.json(jsonResp);
 });

import securityRoutes from './security/security';
// Aplicar Middlewares
router.use('/security', validateKeyMiddleWare, securityRoutes);

import empresasRouter from './empresas/empresas';
router.use('/empresas', validateKeyMiddleWare, validateJwtMiddleWare, empresasRouter);

import fodaRouter  from './foda/fodaEntry';
router.use('/FodaEntrys', validateKeyMiddleWare, validateJwtMiddleWare, fodaRouter);

import Foda  from './foda/foda';
router.use('/Foda', validateKeyMiddleWare, validateJwtMiddleWare, Foda);


import usuariosRouter from './usuarios/usuarios';
router.use('/usuarios',validateKeyMiddleWare, validateJwtMiddleWare ,usuariosRouter);

router.use('/foda', validateKeyMiddleWare, validateJwtMiddleWare, fodaRouter);

export default router;
