import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IFodaEntry } from "./IFodaEntrys";

export class FodaEntrysDao extends MongoDAOBase<IFodaEntry>{
  constructor(conexion: IDBConnection){
      super("FodaEntrys", conexion);
  }
}
