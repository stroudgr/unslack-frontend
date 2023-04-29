var config = new Config();
var gsites = new Sites(config);

// console.log(gsites.sites);

//var sites = gsites.sites;
var i = 0;
var sitesData = new Array();
for (site in gsites.sites) {
    i++;
    sitesData.push([site, gsites.sites[site]]);
    // console.log(secondsToString(gsites.sites[site]))
    if (i === 15) { break; }
}

Highcharts.chart('website-chart-container', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
        text: 'Website usage time'
    },
    subtitle: {
        text: 'Top 15 websites visited'
    },
    plotOptions: {
        pie: {
            center: [270, 100],
            innerSize: 50,
            depth: 45
        },
        series: {
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '10px'
                }
            }
        }
    },
    tooltip: {
        formatter: function () {
            return 'Time spent:' + secondsToString(this.y);
        }
    },
    series: [{
        name: 'Time',
        data: sitesData,
    }]
});