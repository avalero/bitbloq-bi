import BitbloqCollection from '../collections/BitbloqCollection';

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
  months: Array <number>,
}

export type YearsReport = Array<FullYear>;

export default class Report {
  protected collection: BitbloqCollection;

  constructor(c: BitbloqCollection) {
    if (c) this.collection = c;
    else throw new Error('Collection not defined');
  }

  public async newPerYear(years: Array<number>): Promise<Array<NumberYear>> {
    const docs: Array<NumberYear> = [];
    for (let year of years) {
      const number = await this.collection.countNewByYear(year);
      docs.push({ year, number });
    }
    return docs;
  }

  public async newPerMonthYear(year: number): Promise <FullYear> {
    const docs: FullYear = {
      year, 
      'months': [],
    };

    for(let month = 1; month <= 12; month += 1){
      const number = await this.collection.countNewByYearMonth(year,month);
      docs.months.push(number);
    }
    return docs;
  }

  public async fullReport(years: Array<number>):Promise<YearsReport>{
    const fullReport:YearsReport = [];
    for (let year of years){
      fullReport.push(await this.newPerMonthYear(year));
    }
    return fullReport;
  }
}
