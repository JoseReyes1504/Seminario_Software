import { IEmpresa } from "@dao/models/Empresas/IEmpresas";
import { IDataAccessObject } from "@dao/IDataAccessObject";

export class Empresas {
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll(user: string) {
    return this.dao.findByFilter({ "user": user });
  }

  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevaEmpresa: IEmpresa) {
    const gpc = require('generate-pincode')
    const pin = gpc(6)
    const date = new Date();

    const nueva: IEmpresa = {
      ...nuevaEmpresa,
      codigo: pin,
      created: date,
      updated: date
    }
    return this.dao.create(nueva);
  }

  update(id: any, updateEmpresa: IEmpresa) {
    const updateObject = { ...updateEmpresa, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}
