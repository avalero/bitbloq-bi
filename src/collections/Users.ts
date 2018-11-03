import { Collection } from 'mongodb';
import BitbloqCollection from './BitbloqCollection';

export default class Users extends BitbloqCollection {
  public static collectionName: string = 'users';

  constructor(collection: Collection | undefined) {
    super(collection);
  }
}
