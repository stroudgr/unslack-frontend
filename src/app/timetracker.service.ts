import { Injectable } from '@angular/core';
import { Websites } from './websites';

// import * as Config from '../../config.js';
// import * as Sites from '../../sites.js';

import { MessageService } from './message.service';

@Injectable()
export class TimetrackerService {

  websitesData: Websites = {tracked: []};
  constructor(private messageService: MessageService) {
    if (!localStorage.ignoredSites) {
        localStorage.ignoredSites = JSON.stringify([]);
    }
    // console.log('TimetrackerService constructor: ', localStorage);
  }

  addIgnoredSite(site): any {
    if (this.isIgnoredSite(site)) {
        return;
      }
      const sites = JSON.parse(localStorage.ignoredSites);
      sites.push(site);
      localStorage.ignoredSites = JSON.stringify(sites);
  }

  isIgnoredSite(site): boolean {
    const sites = JSON.parse(localStorage.ignoredSites);
    for (const i in sites) {
      if (sites[i] === site) {
        return true;
      }
    }
    return false;
  }

  getSites(): any {
    // console.log('getSites:', localStorage.sites);
    const s = JSON.parse(localStorage.sites);
    const sites = {};
    for (const site in s) {
      if (s.hasOwnProperty(site) && !this.isIgnoredSite(site)) {
        sites[site] = s[site];
      }
    }
    return sites;
  }

  secondsToString(seconds): string {
    const years = Math.floor(seconds / 31536000);
    const days = Math.floor((seconds % 31536000) / 86400);
    const hours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    const mins = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    const secs = (((seconds % 31536000) % 86400) % 3600) % 60;
    let s = '';
    if (years) {
      s = s + ' ' + years + 'y';
    }
    if (days) {
      s = s + ' ' + days + 'd';
    }
    if (hours) {
      s = s + ' ' + hours + 'h';
    }
    if (mins) {
      s = s + ' ' + mins + 'm';
    }
    if (secs) {
      s = s + ' ' + secs.toFixed(0) + 's';
    }
    return s;
  }

  getTrackingData(): Websites {
    // Todo: send the message _after_ fetching the slacker
    this.log(`fetched websites`);
    // console.log('getTrackingData: ', this.getSites());

    const siteData = this.getSites();
    this.websitesData.tracked = [];

    for (const site in siteData) {
      if (site) {
        this.websitesData.tracked.push({name: site, y: siteData[site] / 360});
      }
    }

    this.websitesData.tracked.sort( function(a, b) { return b.y - a.y; } );

    // console.log('getTrackingData this.websitesData', this.websitesData);

    // local file version
    return this.websitesData;

  }

  getSitesForScores(): any {
    // console.log('getSites:', localStorage.sites);
    const s = JSON.parse(localStorage.sites);
    const lastS = JSON.parse(localStorage.lastSentSites);
    const sites = {};
    let secSpent = 0;
    for (const site in s) {
      if (s.hasOwnProperty(site) && !this.isIgnoredSite(site)) {
        if (lastS.hasOwnProperty(site)) {
          secSpent = s[site] - lastS[site];
        } else {
          secSpent = s[site];
        }
        sites[site] = secSpent;
      }
    }
    return sites;
  }

  getTrackingDataAsListForScores(): any[] {
    // Todo: send the message _after_ fetching the slacker
    this.log(`fetched websites`);
    // console.log('getTrackingData: ', this.getSites());

    const siteData = this.getSitesForScores();
    this.websitesData.tracked = [];

    for (const site in siteData) {
      if (site) {
        this.websitesData.tracked.push([site, Math.floor(siteData[site])]);
      }
    }

    // list of lists, not sorted [[site1, seconds1], [site2, seconds2]]
    return this.websitesData.tracked;

  }

  // Log a SlackerService message with the MessageService
  private log(message: string) {
    this.messageService.add('TimetrackerService: ' + message);
  }
}


