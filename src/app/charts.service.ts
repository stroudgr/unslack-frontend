import { Injectable } from '@angular/core';
import { WEBSITES } from './mock-websites';
import { Websites } from './websites';

@Injectable()
export class ChartsService {

  constructor() { }

  /* Get an object of Websites from the Local Data Storage
  and return it.
  */
  getWebsitesData(): Websites {
    console.log('inside charts.service.ts, getWebsiteData');
    return WEBSITES;
  }

  /* Return a list of name from an array of Object.
   Only works if catlist is type obj[] with obj having a name property
   */
  getNameCategoriesFromListOfObject(catlist: any[]): any[] {
    const categories: String[] = [];
    for (const item in catlist) {
      if (item) {
        // console.log(this.chartData[item].name);
        categories.push(catlist[item].name);
      }
    }
    return categories;
  }
}
