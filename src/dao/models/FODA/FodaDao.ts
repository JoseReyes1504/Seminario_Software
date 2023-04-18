import { MongoDAOBase } from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { IFoda, DefaultFoda } from '../FODA/IFoda';
import { IDataAccessObject } from '@dao/IDataAccessObject';
import { ObjectId } from 'mongodb';

export class FodaDao extends MongoDAOBase<IFoda> {
    private empresaDao: IDataAccessObject;    
    constructor(conexion: IDBConnection, empresaDao: IDataAccessObject) {
        super("foda", conexion);
        this.empresaDao = empresaDao;        
    }

    public async create(foda: Partial<IFoda>) {
        const { empresa: { id } } = foda;
        if (!ObjectId.isValid(id)) {
            throw new Error("Empresa Object Id not Valid")
        }
        const { _id, nombre } = await this.empresaDao.findByID(id.toString());
        // const { idC, usuario, email } = await this.UserDao.findByID(id.toString());
        const newFoda: IFoda = {
            ...DefaultFoda(),
            ...foda,
            empresa: { id: _id, nombre },
            // owner: { id: idC, usuario, email},
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return super.create(newFoda);
    }

    public async updateCounter(fodaId: string | ObjectId, type: string) {
        const oFodaId = typeof fodaId === 'string' ? new ObjectId(fodaId) : fodaId;
        const filter = { _id: oFodaId };
        const updCmd = { "$inc": { "entradas": 1 }, "$set": { "updatedAt": new Date() } };
        updCmd["$inc"][`${type}cantidad`] = 1;
        console.log('updateCounter:', { updCmd, oFodaId });
        return super.rawUpdate(filter, updCmd);
    }


    
    public async updateDisCounter(fodaId: string | ObjectId, type: string) {
        const oFodaId = typeof fodaId === 'string' ? new ObjectId(fodaId) : fodaId;
        const filter = { _id: oFodaId };
        const updCmd2 = { "$inc": { "entradas": -1 }, "$set": { "updatedAt": new Date() } };
        updCmd2["$inc"][`${type}cantidad`] = -1;
        console.log('updateCounter:', { updCmd2, oFodaId });
        return super.rawUpdate(filter, updCmd2);
    }
}
