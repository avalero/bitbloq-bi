import { MongoClient, Collection } from 'mongodb';

const url: string = 'mongodb://localhost:27017';
const dbName = 'bitbloq';

const countUsers = async (collection: Collection): Promise<number> => {
  const items = await collection.find().toArray();
  return items.length;
};

const countChromeAppUsers = async (collection: Collection, chromeapp: boolean = true): Promise<number> => {
  const items = await collection.find({ chromeapp }).toArray();
  return items.length;
};

(async () => {
  try {
    const client = await MongoClient.connect(
      url,
      { useNewUrlParser: true }
    );
    const db = await client.db(dbName);
    console.log('Connected to db');
    const collection = await db.collection('users');
    console.log('Colletion opened');
    let number: number = await countUsers(collection);
    console.log(`Hay ${number} usuarios`);
    number = await countChromeAppUsers(collection, false);
    console.log(`Hay ${number} usuarios con chromeApp`);
    if (client) client.close();
  } catch (error) {
    console.log(error);
  }
})();
