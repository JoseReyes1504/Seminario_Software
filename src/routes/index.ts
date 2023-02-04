import express from 'express';
const router  = express.Router();

import usuariosRouter from './usuarios/usuarios';


router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

router.use('/usuarios', usuariosRouter);

export default router;
