import { Collection } from 'mongodb';
import DbClient from './DbClient';
import Users from './collections/Users';
import NewUsersReport, { NumberYear } from './reports/NewUsersReport';

const url: string = 'mongodb://localhost:27017';
const dbName: string = 'bitbloq';

(async () => {
  try {
    const client: DbClient = new DbClient(url, dbName);
    await client.connect();
    const collection: Collection = await client.getCollection(Users.collectionName);
    const usersCollection = new Users(collection);
    const usersReport = new NewUsersReport(usersCollection);

    const years: Array<number> = [2015, 2016, 2017, 2018];

    const newUsers: Array<NumberYear> = await usersReport.newUsersPerYear(years);
    for (let users of newUsers) {
      console.log(users);
    }

    await client.close();
  } catch (error) {
    console.dir(error);
    throw error;
  }
})();
