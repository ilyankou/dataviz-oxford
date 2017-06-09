var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1bCt6OzyH7D0mbUd7uGKuVTbDmfcTDfto-NFnrZu9ldM/pubhtml';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: processData,
    simpleSheet: false
  });
}

function processData(data, tabletop) {
  scatter = data.Scatter.elements;
  doScatter(scatter);

  timeline = data.Timeline.elements;
  doTimeline(timeline);

  compare = data.Timeline.elements;
  doCompare(compare);

  dataset = [];
  for (o in timeline) {
    a = []
    for (k in timeline[o]) {
      if (k == 'Lat' || k == 'Lon') continue;
      a.push(timeline[o][k]);
    }
    dataset[o] = a;
  }

  columns = [];
  for (i in timeline[0]) {
    if (i == 'Lat' || i == 'Lon') continue;

    columns.push({
      title: i,
      className: (i == 'City') ? 'td-right' : 'td-center'
    });
  }

  $('#data-table').DataTable({
    data: dataset,
    columns: columns,
    paging: false,
    ordering: true,
    info: false,
    searching: false,
  });

  for (i in columns) {
    if (i == 0) continue; // skip 'City'
    $('#var-x, #var-y').append('<option value="' + i + '">' + columns[i].title.split(',')[0] + '</option>');
  }

  $('#var-y').val('2');

}

function getParams(data) {
  var params = Object.keys(data[0]);
  for (i = 0; i < 3; i++) {params.shift();} // remove first 3 columns (City, Lat, Lon)
  return params;
}

function getUnits(params) {
  var units = [];
  for (p in params) {
    u = params[p].split(',');
    u.shift();
    units.push(u.join(','));
  }
  return units;
}


function getStats(data, params) {
  var stats = {};
  for (i in params) {
    p = params[i];
    stats[p] = {};

    max = 0;
    min = parseFloat(data[0][p]);
    for (i in data) {
      max = parseFloat(data[i][p]) > max ? parseFloat(data[i][p]) : max;
      min = parseFloat(data[i][p]) < min ? parseFloat(data[i][p]) : min;
    }

    stats[p].max = max;
    stats[p].min = min;
    stats[p].deg = (max - min) / 18.0;
  }
  return stats;
}

window.addEventListener('DOMContentLoaded', init);
