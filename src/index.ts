import { Collection } from 'mongodb';
import DbClient from './DbClient';
import Users from './collections/Users';
import NewUsersReport, { NumberYear, FullYear, YearsReport } from './reports/NewUsersReport';
import config from '../res/config.json'

const nodes: Array<string> = config["mongo-nodes"];
const port: number = config.port;
const dbName: string = config.db;

console.log(`Data from: ${config}`);

(async () => {
  try {
    const client: DbClient = new DbClient(nodes, port, dbName);
    await client.connect();
    const collection: Collection = await client.getCollection(Users.collectionName);
    const usersCollection = new Users(collection);
    const usersReport = new NewUsersReport(usersCollection);

    const years: Array<number> = [2015, 2016, 2017, 2018];

    const newUsersPerYear: Array<NumberYear> = await usersReport.newUsersPerYear(years);
    for (let users of newUsersPerYear) {
      console.log(users);
    }

    let newUserPerYearMonth: Array<FullYear> = [];
    for (let year of years){
      const fullYear:FullYear = await usersReport.newUsersPerMonthYear(year);
      newUserPerYearMonth.push(fullYear);
      console.log(fullYear);
    }

    let fullReport: YearsReport = await usersReport.fullReport(years);
    await client.close();
  } catch (error) {
    console.dir(error);
    throw error;
  }
})();
