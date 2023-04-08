import express from 'express';
const router = express.Router();
import { EmpresasDao } from '@dao/models/Empresas/EmpresasDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEmpresa } from '@dao/models/Empresas/IEmpresas';
import { Empresas } from '@libs/Empresas/Empresas';

const empresasDao = new EmpresasDao(MongoDBConn);

let empresasModel:Empresas;
empresasDao.init().then(()=>{
  empresasModel = new Empresas(empresasDao);
});

//registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "empresas/all"},
    "getById": {"method":"get", "url": "empresas/byid/:id"},
    "new": {"method":"post", "url": "empresas/new"},
    "update": {"method":"put", "url": "empresas/upd/:id"},
    "delete": {"method":"delete", "url": "empresas/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await empresasModel.getAll());
});

// router.get('/byid/', async (req, res)=>{
//   const { id } = req.query;
//   const empresa = await empresasModel.getById(id);
//   if(empresa){
//     return res.status(200).json(empresa);
//   }
//   return res.status(404).json({"error":"No se encontró Empresa"});
// });

router.post('/new', async (req, res) => {
  console.log("Empresas /new request body:", req.body);
  const {
    codigo = "NA",
    nombre ="John Doe Corp",
    status = "Activo",
    tipo = 1
  } = req.body;
  //TODO: Validar Entrada de datos
  const newEmpresa: IEmpresa = {
    codigo,
    nombre,
    status,
    tipo
  };
  if (await empresasModel.add(newEmpresa)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Empresa"}
  );
});

router.put('/updEmp/', async (req, res) => {
  const { id } = req.query;
  const {
    nombre="----NotRecieved------",
  } = req.body;

  if (nombre === "----NotRecieved------"){
    return res.status(403).json({"error":"Debe venir el nombre correcto"});
  }
  const UpdateEmpresa : IEmpresa = {
    nombre,
  };

  if (await empresasModel.update(id, UpdateEmpresa)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Empresa"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await empresasModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Empresa"});
});

export default router;
