import { IFodaEntry } from "@server/dao/models/FODA/IFodaEntrys";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";


export class FodaEntrys {
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
        this.dao = dao;
    }

    public getAllFodaEntrys(fodaId: any) {
        return this.dao.findByFilter({ "foda": fodaId });
    }

    getAll() {
        return this.dao.findAll();
    }

    getById(id: any) {
        return this.dao.findByID(id);
    }

    add(NuevaEntidad: IFodaEntry) {
        const nuevo: IFodaEntry = {
            ...NuevaEntidad,            
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
