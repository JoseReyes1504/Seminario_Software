import { IDBConnection } from "./IDBConnection";
import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb+srv://TallerSoftware:TallerSoftware@tallersoftware.hudzq5l.mongodb.net/';
const mongoDBName = 'SW2023';

export class MongoDBConn implements IDBConnection {
  static connection:MongoClient = null;
	private constructor(){}  
  getConnection(): Promise<any> {
    throw new Error("Method not implemented.");
  }
	public static async getConnection(){
		if(!this.connection){
      this.connection = await MongoClient.connect(mongoURI);
		}
    return this.connection.db(mongoDBName);
	}
}
