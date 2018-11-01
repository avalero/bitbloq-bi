import { MongoClient, Collection, Db } from 'mongodb';

export default class DbClient {
  public client: MongoClient | undefined;
  public db: Db | undefined;
  private url: string;
  private dbName: string;

  constructor(url: string, dbName: string) {
    this.url = url;
    this.dbName = dbName;
    this.client = undefined;
    this.db = undefined;
  }

  public async connect(): Promise<Db> {
    try {
      this.client = await MongoClient.connect(
        this.url,
        { useNewUrlParser: true }
      );
      this.db = await this.client.db(this.dbName);
      console.log(`Connected to db ${this.url}/${this.dbName}`);
      return this.db;
    } catch (error) {
      console.log(`ERROR: Unable to connect to db ${this.url}/${this.dbName}`);
      throw error;
    }
  }

  public async getCollection(collectionName: string): Promise<Collection> {
    if (this.db) {
      try {
        const collection: Collection = await this.db.collection(collectionName);
        console.log(`Collection ${collectionName} opened`);
        return collection;
      } catch (error) {
        console.log(`Unable to get Collection ${collectionName}`);
        throw error;
      }
    } else {
      throw new Error('Cannot get Collection. Db not connected');
    }
  }

  public async close(): Promise<void> {
    if (this.client) {
      try {
        await this.client.close();
      } catch (error) {
        console.log('Cannot close connection with db');
      }
    }
  }
}
