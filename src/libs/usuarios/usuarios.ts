import { IUsuarios } from "@server/dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";


export class Usuarios {
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
        this.dao = dao;
    }

    getAll() {
        return this.dao.findAll();
    }

    getById(id: string) {
        return this.dao.findByID(id);
    }

    add(NuevoUsuario: IUsuarios) {
        const nuevo: IUsuarios = {
            ...NuevoUsuario,
            codigo: (Math.random() * 1000).toString() + new Date().getTime().toString(),
            creado: new Date(),
            ultimoAcceso: new Date(),
        }
        return this.dao.create(nuevo);
    }

    update(id: string, updateUsuario: IUsuarios) {
        const updateObject = { ...updateUsuario, creado: new Date() };

        return this.dao.update(id, updateObject);
    }

    delete(id: string){
        return this.dao.delete(id);
    }
}
