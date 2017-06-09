var chart;

function doScatter(scatter) {
  for (i in scatter) {
   temp = scatter[i];
   scatter[i] = [parseFloat(temp.x), parseFloat(temp.y), temp.City];
  }

  var chart = new Highcharts.Chart('cities-scatter', {
    chart: {
      type: 'scatter',
      backgroundColor: 'PALEVIOLETRED'
    },

    title: {
      text: 'Visualizing Cities',
      style: {
        color: 'white',
        font: 'bold 22px Arial'
      }
    },

    subtitle: {
      text: 'Source: Bloomberg Global Cities Index 2014',
      style: {
        color: 'white'
      }
    },

    xAxis: {
      visible: false,
    },

    yAxis: {
      visible: false,
    },

    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        color: 'white',
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          align: 'left',
          color: 'PALEVIOLETRED',
          format: '{point.city}',
          backgroundColor: 'white'
        },
      },

      scatter: {
        marker: {
          radius: 6,
          states: {
            hover: {
              enabled: true
            }
          }
        },

        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        },

        tooltip: {
          headerFormat: '',
          pointFormat: '{point.city}',
          animation: false,
          backgroundColor: 'yellow',
        }
      }
    },

    data: {
      firstRowAsNames: false,
      seriesMapping: [{x: 0, y: 1, city: 2}],
      rows: scatter,
      color: 'black'
    }

  });

}
