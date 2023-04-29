/**
 * Stores the time that is spent on each site.
 *
 * The primary interface to this class is through setCurrentFocus.
 */
function Sites(config) {
  this._config = config;
  if (!localStorage.sites) {
    localStorage.sites = JSON.stringify({});
  }
  if (!localStorage.lastSentSites) {
    localStorage.lastSentSites = localStorage.sites;
  }
  this._currentSite = null;
  this._siteRegexp = /^(\w+:\/\/[^\/]+).*$/;
  this._startTime = null;
}

/**
 * Returns the a dictionary of site -> seconds.
 */
Object.defineProperty(Sites.prototype, "sites", {
  get: function() {
    // console.log("localStorage.sites", localStorage.sites);
    var s = JSON.parse(localStorage.sites);
    var sites = {}
    for (var site in s) {
      if (s.hasOwnProperty(site) && !this._config.isIgnoredSite(site)) {
        sites[site] = s[site];
      }
    }
    return sites;
  }
});

/**
 * Returns just the site/domain from the url. Includes the protocol.
 * chrome://extensions/some/other?blah=ffdf -> chrome://extensions
 * @param {string} url The URL of the page, including the protocol.
 * @return {string} The site, including protocol, but not paths.
 */
Sites.prototype.getSiteFromUrl = function(url) {
  var match = url.match(this._siteRegexp);
  if (match) {
    return match[1];
  }
  return null;
};

Sites.prototype._updateTime = function() {
  if (!this._currentSite || !this._startTime) {
    return;
  }
  var delta = new Date() - this._startTime;
  // console.log("Site: " + this._currentSite + " Delta = " + delta/1000);
  if (delta/1000/60 > 2*this._config.updateTimePeriodMinutes) {
    // console.log("Delta of " + delta/1000 + " seconds too long; ignored.");
    return;
  }
  var sites = this.sites;
  if (!sites[this._currentSite]) {
    sites[this._currentSite] = 0;
  }
  sites[this._currentSite] += delta/1000;
  localStorage.sites = JSON.stringify(sites);
};

/**
 * This method should be called whenever there is a potential focus change.
 * Provide url=null if Chrome is out of focus.
 */
Sites.prototype.setCurrentFocus = function(url) {
  // console.log("setCurrentFocus: " + url);
  this._updateTime();
  if (url == null) {
    this._currentSite = null;
    this._startTime = null;
    chrome.browserAction.setIcon(
        {path: {19: 'images/icon_paused19.png',
                38: 'images/icon_paused38.png'}});
  } else {
    this._currentSite = this.getSiteFromUrl(url);
    this._startTime = new Date();
    chrome.browserAction.setIcon(
        {path: {19: 'images/icon19.png',
                38: 'images/icon38.png'}});
  }
};

/**
 * Clear all statistics.
 */
Sites.prototype.clear = function() {
  localStorage.sites = JSON.stringify({});
  this._config.lastClearTime = new Date().getTime();
};

var i = 0;
function go () {
  console.log(i);
  i++;

  if (!localStorage.slackerRooms) {
    localStorage.slackerRooms = JSON.stringify([]);
  }
  allRooms = JSON.parse(localStorage.slackerRooms);
  
  for (const room in allRooms) {
    if (room) {
      // console.log('currRoom: ', room);
      // console.log('currRoomId: ', typeof(room));

      name = JSON.parse(localStorage.slackerRoomIdToName)[allRooms[room].id.toString()];
      if (typeof name === 'undefined') {
        name = null;
      }

      s = JSON.parse(localStorage.sites);
      lastS = JSON.parse(localStorage.lastSentSites);
      sites = {};
      for (site in s) {
        secSpent = 0;
        if (s.hasOwnProperty(site) & !Config.prototype.isIgnoredSite(site)) {
          if (lastS.hasOwnProperty(site)){
            secSpent = s[site] - lastS[site];
          } else {
            secSpent = s[site];
          }
          sites[site] = secSpent;
        }
      }

      tracked = [];
      for (const site in sites) {
        if (site) {
          tracked.push([site, Math.floor(sites[site])]);
        }
      }

      console.log('sendDataToAllRooms', {
        MessageType: 'SendDataRequest',
        RoomId: allRooms[room].id.toString(),
        UserId: name,
        History: tracked,
        LastSubmitTime: Date.now()
      });

      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://localhost:9999', true);

      // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // Request finished. Do processing here.
            console.log(xhr.status);
            localStorage.lastSentSites = localStorage.sites;
        }
      }

      xhr.send('\f' + JSON.stringify({ 
        MessageType: 'SendDataRequest',
        RoomId: allRooms[room].id.toString(),
        UserId: name,
        History: tracked,
        LastSubmitTime: Date.now().toString()
        })+ '\f')
    }
  }

  
  setTimeout(go, 10000); // callback
}
go();
