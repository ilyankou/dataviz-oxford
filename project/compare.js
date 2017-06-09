function doCompare(data) {
  var map = L.map('cities-compare', {zoomControl: false});

  L.control.zoom({position: 'topright'}).addTo(map);

  map.scrollWheelZoom.disable();

  L.tileLayer.provider('Stamen.TonerBackground', {
    maxZoom: 18
  }).addTo(map);


  var params = getParams(data);
  var units = getUnits(params);
  var stats = getStats(data, params);

  function generateLayer(x, y) {
    xx = x-1;
    yy = y-1;
    x = params[x-1];
    y = params[y-1];

    cities = [];
    for (i in data) {
      var m = L.circleMarker(
        [parseFloat(data[i].Lat), parseFloat(data[i].Lon)],
        {
          fillOpacity: 1,
          fillColor: getColor(i, y),
          color: getColor(i, y),
          radius: ((data[i][x] - stats[x].min) / stats[x].deg) + 2,
        }
      );

      m.bindPopup('<b>' + data[i].City + '</b><br>' + x + ': ' + data[i][x] + '<br>' + y + ': ' + data[i][y], {className: 'timeline-popup'});

      m.on('mouseover', function() { this.openPopup(); });
      m.on('mouseout', function() { this.closePopup(); });

      cities.push(m);
    }

    return L.featureGroup(cities);
  }

  var layer = generateLayer(3, 5);
  layer.addTo(map);
  map.fitBounds(layer.getBounds());

  function getColor(i, p) {
    var value = data[i][p] / (stats[p].max - stats[p].min);
    var hue = ((1 - value) * 120).toString(10);
    return ['hsl(', hue, ', 100%, 50%)'].join('');
  }

  $('#var-x, #var-y').change(function() {
    map.removeLayer(layer);
    var x = parseInt($('#var-x').val());
    var y = parseInt($('#var-y').val());
    layer = generateLayer(x, y);
    layer.addTo(map);
  });

}
