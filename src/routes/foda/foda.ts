import express from 'express';
import { EmpresasDao } from '@dao/models/Empresas/EmpresasDao';
import { FodaDao } from '../../dao/models/FODA/FodaDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { Foda } from '../../libs/FODA/Foda';

const empresasDao = new EmpresasDao(MongoDBConn);
let fodaDao;
let fodaModel: Foda;
empresasDao.init().then(() => {
    fodaDao = new FodaDao(MongoDBConn, empresasDao);
    fodaDao.init().then(() => {
        fodaModel = new Foda(fodaDao);
    });
});
const router = express.Router();

router.get('/fodaEmp/', async (req, res) => {
    const { id } = req.query;
    const fodas = await fodaModel.getAllFromEmpresa(id);
    return res.status(200).json(fodas);
});

router.post('/new/', async (req, res) => {    
    const { id } = req.query;
    const { nombre } = req.body;
    const result = await fodaModel.newFoda(nombre, id);
    return res.status(200).json(result);
});

router.put('/:empresa/tmp/:fodaId', async (req, res) => {
    const { fodaId } = req.params;
    const { type } = req.body;
    const updObject = await fodaModel.updateFoda(fodaId, type);
    return res.status(200).json(updObject);
});

router.put('/:empresa/upd/:fodaId/nombre', async (req, res) => {
    const { fodaId } = req.params;
    const { nombre } = req.body;
    const updObject = await fodaModel.setNombre(fodaId, nombre);
    return res.status(200).json(updObject);
});
router.put('/:empresa/upd/:fodaId/estado', async (req, res) => {
    const { fodaId } = req.params;
    const { estado } = req.body;
    const updObject = await fodaModel.setEstado(fodaId, estado);
    return res.status(200).json(updObject);
});
router.put('/:empresa/upd/:fodaId/observacion', async (req, res) => {
    const { fodaId } = req.params;
    const { observacion } = req.body;
    const updObject = await fodaModel.setObservation(fodaId, observacion);
    return res.status(200).json(updObject);
});

export default router;