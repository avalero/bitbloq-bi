import { Collection } from 'mongodb';
import BitbloqCollection from './BitbloqCollection';

export default class Users extends BitbloqCollection {
  public static collectionName: string = 'users';

  constructor(collection: Collection | undefined) {
    super(collection);
  }

  public async newUsersByMonth(year: number, month: number = 1): Promise<Array<Object>> {
    if (month > 12) throw new Error(`Invalid month ${month}`);

    let mm: string = '';
    if (month < 10) mm = ('0' + month).slice(-2);
    else mm = month.toString();

    const from = new Date(`${year}-${mm}-01T00:00:00.000Z`);
    const to = new Date(`${year}-${mm}-${this.daysInMonth(month, year)}T23:59:59.999Z`);
    return await this.collection.find({ createdAt: { $gt: from, $lt: to } }).toArray();
  }

  public async countNewUsersByYearMonth(year: number, month: number = 1): Promise<number> {
    if (month > 12) throw new Error(`Invalid month ${month}`);

    let mm: string = '';
    if (month < 10) mm = ('0' + month).slice(-2);
    else mm = month.toString();

    const from = new Date(`${year}-${mm}-01T00:00:00.000Z`);
    const to = new Date(`${year}-${mm}-${this.daysInMonth(month, year)}T23:59:59.999Z`);
    return await this.collection.find({ createdAt: { $gt: from, $lt: to } }).count();
  }

  public async newUsersByYear(year: number): Promise<Array<Object>> {
    const from = new Date(`${year}-01-01T00:00:00.000Z`);
    const to = new Date(`${year}-12-31T23:59:59.999Z`);
    return await this.collection.find({ createdAt: { $gt: from, $lt: to } }).toArray();
  }

  public async countNewUsersByYear(year: number): Promise<number> {
    const from = new Date(`${year}-01-01T00:00:00.000Z`);
    const to = new Date(`${year}-12-31T23:59:59.999Z`);
    return await this.collection.find({ createdAt: { $gt: from, $lt: to } }).count();
  }
}
