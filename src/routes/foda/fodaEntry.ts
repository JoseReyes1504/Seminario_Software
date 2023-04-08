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
        "getById": { "method": "get", "url": "FodaEntrys/byid/:id" },
        "new": { "method": "post", "url": "FodaEntrys/new" },
        "update": { "method": "put", "url": "FodaEntrys/upd/:id" },
        "delete": { "method": "delete", "url": "FodaEntrys/del/:id" },
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
    res.status(200).json(await FodaModel.getAll());
});

router.get('/byid/', async (req, res) => {
    const { id } = req.query;
    const entidad = await FodaModel.getById(id);
    if (entidad) {
        return res.status(200).json(entidad);
    }
    return res.status(404).json({ "error": "No se encontró la entidad" });
});

router.post('/new', async (req, res) => {
    console.log("Empresas /new request body:", req.body);
    const {
        Codigo= "1204",
        empresa = "1504",
        descripcion = "descripcion",
        tipo = "A",
        categorias = {},
        valoracion = 3,
        observacion = "Mayor detalle",

    } = req.body;
    //TODO: Validar Entrada de datos
    const newFodaEntry: IFodaEntry = {
        Codigo,
        empresa,
        descripcion,
        tipo,
        categorias,
        valoracion,
        observacion
    };
    if (await FodaModel.add(newFodaEntry)) {
        return res.status(200).json({ "created": true });
    }
    return res.status(404).json(
        { "error": "Error al agregar una nueva entidad" }
    );
});

router.put('/updType/', async (req, res) => {
    const { id } = req.query;
    const {
        tipo = "----NotRecieved------",
    } = req.body;

    if (tipo === "----NotRecieved------") {
        return res.status(403).json({ "error": `Debe venir el tipo correctos "F", "O", "D", "A"`  });
    }
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

router.delete('/del/', async (req, res) => {
    const { id } = req.query;
    if (await FodaModel.delete(id)) {
        return res.status(200).json({ "deleted": true });
    }
    return res.status(404).json({ "error": "No se pudo eliminar Empresa" });
});
export default router;
