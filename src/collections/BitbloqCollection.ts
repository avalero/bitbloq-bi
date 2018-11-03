import { Collection } from 'mongodb';

export default class BitbloqCollection {
  protected collection: Collection;

  constructor(collection: Collection | undefined) {
    if (collection) this.collection = collection;
    else throw new Error('Collection is undefined');
  }

  public async countDocuments(): Promise<number> {
    try {
      return await this.collection.countDocuments();
    } catch (error) {
      console.dir(error);
      throw error;
    }
  }

  protected daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  public async newByMonth(year: number, month: number = 1): Promise<Array<Object>> {
    if (month > 12) throw new Error(`Invalid month ${month}`);

    let mm: string = '';
    if (month < 10) mm = ('0' + month).slice(-2);
    else mm = month.toString();

    const from = new Date(`${year}-${mm}-01T00:00:00.000Z`);
    const to = new Date(`${year}-${mm}-${this.daysInMonth(month, year)}T23:59:59.999Z`);
    return await this.collection.find({ createdAt: { $gt: from, $lt: to } }).toArray();
  }

  public async countNewByYearMonth(year: number, month: number = 1): Promise<number> {
    if (month > 12) throw new Error(`Invalid month ${month}`);

    let mm: string = '';
    if (month < 10) mm = ('0' + month).slice(-2);
    else mm = month.toString();

    const from = new Date(`${year}-${mm}-01T00:00:00.000Z`);
    const to = new Date(`${year}-${mm}-${this.daysInMonth(month, year)}T23:59:59.999Z`);
    return await this.collection.find({ createdAt: { $gt: from, $lt: to } }).count();
  }

  public async newByYear(year: number): Promise<Array<Object>> {
    const from = new Date(`${year}-01-01T00:00:00.000Z`);
    const to = new Date(`${year}-12-31T23:59:59.999Z`);
    return await this.collection.find({ createdAt: { $gt: from, $lt: to } }).toArray();
  }

  public async countNewByYear(year: number): Promise<number> {
    const from = new Date(`${year}-01-01T00:00:00.000Z`);
    const to = new Date(`${year}-12-31T23:59:59.999Z`);
    return await this.collection.find({ createdAt: { $gt: from, $lt: to } }).count();
  }

  public async get(): Promise<Array<Object>>{
    return await this.collection.find().toArray();
  }
}
