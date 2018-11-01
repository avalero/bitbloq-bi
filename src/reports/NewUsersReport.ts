import Users from '../collections/Users';

export interface NumberYear{
  year: number,
  number: number,
}

export default class NewUsersReport{
  private usersCollection:Users;

  constructor(uc:Users){
    if(uc)
      this.usersCollection = uc;
    else
      throw new Error('Users Collection not defined');
  }

  public async newUsersPerYear(years: Array<number>):Promise< Array <NumberYear>>{
    const users:Array<NumberYear> = [];
    for (let year of years){
      const number = await this.usersCollection.countNewUsersByYear(year);
      users.push({year, number});
    }
    return users;
  }
}