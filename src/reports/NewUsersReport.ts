import Users from '../collections/Users';

export interface NumberYear {
  year: number,
  number: number,
}

export interface NumberMonth {
  month: number,
  number: number,
}

export interface FullYear {
  year: number,
  months: Array <NumberMonth>,
}

export type YearsReport = Array<FullYear>;

export default class NewUsersReport {
  private usersCollection: Users;

  constructor(uc: Users) {
    if (uc) this.usersCollection = uc;
    else throw new Error('Users Collection not defined');
  }

  public async newUsersPerYear(years: Array<number>): Promise<Array<NumberYear>> {
    const users: Array<NumberYear> = [];
    for (let year of years) {
      const number = await this.usersCollection.countNewUsersByYear(year);
      users.push({ year, number });
    }
    return users;
  }

  public async newUsersPerMonthYear(year: number): Promise <FullYear> {
    const users: FullYear = {
      year, 
      'months': [],
    };

    for(let month = 1; month <= 12; month += 1){
      const number = await this.usersCollection.countNewUsersByYearMonth(year,month);
      users.months.push({ month, number });
    }
    return users;
  }

  public async fullReport(years: Array<number>):Promise<YearsReport>{
    const fullReport:YearsReport = [];
    for (let year of years){
      fullReport.push(await this.newUsersPerMonthYear(year));
    }
    return fullReport;
  }
}
