import * as fs from 'fs';

import { Collection } from 'mongodb';
import DbClient from './DbClient';
import Users from './collections/Users';
import NewUsersReport from './reports/NewUsersReport';
import { NumberYear, FullYear, YearsReport } from './reports/Report';

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
    let fullReport: YearsReport = await usersReport.fullReport(years);
  
    //Save full report to file
    fs.writeFileSync('/home/avalero/file.txt', '');
    fullReport.forEach( year => {
      year.months.forEach( (number,month) =>{
        const data:string = `${year.year}\t${month+1}\t${year.year}-${month+1}\t${number}\r\n`;
        fs.appendFileSync('/home/avalero/file.txt', data);
      });
    });
    
    
    await client.close();

  } catch (error) {
    console.dir(error);
    throw error;
  }
})();
