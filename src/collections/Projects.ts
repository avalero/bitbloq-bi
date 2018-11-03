import * as mongodb from 'mongodb';
import BitbloqCollection from './BitbloqCollection';

export default class Projects extends BitbloqCollection {
  public static collectionName: string = 'projects';

  constructor(collection: mongodb.Collection | undefined) {
    super(collection);
  }

  public async getProjectsByUser(user: string): Promise<Array<Object>>{
    const query = {
      "creator": new mongodb.ObjectID(user)
    };
    return await this.collection.find(query).toArray();
  }
}
