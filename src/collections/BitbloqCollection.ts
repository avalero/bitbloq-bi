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
}
