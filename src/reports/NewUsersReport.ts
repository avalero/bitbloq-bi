import Users from '../collections/Users';
import Report from './Report';


export default class NewUsersReport extends Report {
  private usersCollection: Users;

  constructor(uc: Users) {
    super(uc);
    if (uc) this.usersCollection = uc;
    else throw new Error('Users Collection not defined');
  }
}
