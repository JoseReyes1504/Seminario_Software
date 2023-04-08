import { IFodaEntry } from "@server/dao/models/FODA/IFodaEntrys";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";


export class FodaEntrys {
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
        this.dao = dao;
    }

    getAll() {
        return this.dao.findAll();
    }

    getById(id: any) {
        return this.dao.findByID(id);
    }

    add(NuevaEntidad: IFodaEntry) {
        const gpc = require('generate-pincode')
        const pin = gpc(4)

        const nuevo: IFodaEntry = {
            ...NuevaEntidad,
            Codigo: pin,
            observacion: "N/D"
        }
        return this.dao.create(nuevo);
    }

    update(id: any, updateEntidad: IFodaEntry) {
        const updateObject = { ...updateEntidad, creado: new Date() };

        return this.dao.update(id, updateObject);
    }

    delete(id: any) {
        return this.dao.delete(id);
    }
}
