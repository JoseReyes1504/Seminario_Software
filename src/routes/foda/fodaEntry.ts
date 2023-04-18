import express from 'express';
const router = express.Router();
import { FodaEntrysDao } from '@server/dao/models/FODA/FodaEntrysDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IFodaEntry } from '@server/dao/models/FODA/IFodaEntrys';
import { FodaEntrys } from '@server/libs/FODA/FodaEntrys';

const FodaDao = new FodaEntrysDao(MongoDBConn);

let FodaModel: FodaEntrys;
FodaDao.init().then(() => {
    FodaModel = new FodaEntrys(FodaDao);
});

//registrar los endpoint en router
//http://localhost:3001/FodaEntrys
router.get('/', (_req, res) => {
    const jsonUrls = {
        "getAll": { "method": "get", "url": "FodaEntrys/all" },
        "getByIdAll": { "method": "get", "url": "FodaEntrys/allByFoda/:fodaId" },
        "getById": { "method": "get", "url": "FodaEntrys/byid/:id" },
        "new": { "method": "post", "url": "FodaEntrys/new/:Foda" },
        "update": { "method": "put", "url": "FodaEntrys/updType/:id" },
        "delete": { "method": "delete", "url": "FodaEntrys/del/:id" },
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
    res.status(200).json(await FodaModel.getAll());
});

router.get('/allByFoda/:fodaId', async (req, res) => {
    const { fodaId } = req.params;
    res.status(200).json(await FodaModel.getAllFodaEntrys(fodaId));
});

router.get('/byid/:id', async (req, res) => {
    const { id } = req.params;
    const entidad = await FodaModel.getById(id);
    if (entidad) {
        return res.status(200).json(entidad);
    }
    return res.status(404).json({ "error": "No se encontró la entidad" });
});

router.post('/new/:Foda', async (req, res) => {
    const { Foda } = req.params;
    const {
        foda = Foda,
        descripcion = "descripcion",
        tipo = "N",
    } = req.body;
    //TODO: Validar Entrada de datos
    const newFodaEntry: IFodaEntry = {
        foda,
        descripcion,
        tipo,
    };
    if (await FodaModel.add(newFodaEntry)) {
        return res.status(200).json({ "created": true });
    }
    return res.status(404).json(
        { "error": "Error al agregar una nueva entidad" }
    );
});

router.put('/updType/:id', async (req, res) => {
    const { id } = req.params;
    const {
        tipo,
    } = req.body;

    const updateType: IFodaEntry = {
        tipo,
    };

    if (await FodaModel.update(id, updateType)) {
        return res
            .status(200)
            .json({ "updated": true });
    }
    return res
        .status(404)
        .json(
            {
                "error": "Error al actualizar el tipo"
            }
        );
});

router.delete('/del/:id', async (req, res) => {
    const { id } = req.params;
    if (await FodaModel.delete(id)) {
        return res.status(200).json({ "deleted": true });
    }
    return res.status(404).json({ "error": "No se pudo eliminar la entidad" });
});
export default router;
