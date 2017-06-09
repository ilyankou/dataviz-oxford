function doTimeline(data) {
  var map = L.map('cities-timeline', {zoomControl: false});

  L.control.zoom({position: 'topright'}).addTo(map);

  map.scrollWheelZoom.disable();

  L.tileLayer.provider('Stamen.TonerBackground', {
    maxZoom: 18
  }).addTo(map);

  var params = getParams(data);
  var units = getUnits(params);
  var stats = getStats(data, params);

  layers = [];

  for (i in params) {
    var p = params[i];
    var layer = [];

    for (j in data) {
      var m = L.circleMarker(
        [parseFloat(data[j].Lat), parseFloat(data[j].Lon)],
        {
          radius: ((data[j][p] - stats[p].min) / stats[p].deg) + 2,
          fillOpacity: 1
        }
      ).bindPopup('<b>' + data[j].City + '</b><br>' + data[j][p] + units[i], {className: 'timeline-popup'});

      m.on('mouseover', function(){
         this.setStyle({ color: 'orange' });
         this.openPopup();
      });

      m.on('mouseout', function(){
        this.setStyle({color: '#3388ff'});
        this.closePopup();
      });

      layer.push(m);
    }

    layers.push(L.featureGroup(layer));
  }

  map.fitBounds(layers[0].getBounds());

  currentLayer = -1;
  play = true;

  function nextLayer() {
    if (play) {
      if (map.hasLayer(layers[currentLayer])) {
        map.removeLayer(layers[currentLayer]);
      }
      currentLayer = (currentLayer == layers.length - 1) ? 0 : currentLayer + 1;
      layers[currentLayer].addTo(map);

      icon = $('#timeline-header').hasClass('pink') ? 'pause' : 'play';
      $('#timeline-header').html('<i class="fa fa-' + icon + '"></i> ' + params[currentLayer]);
    }
    setTimeout(nextLayer, 2000);
  }

  $('#timeline-header').click(function() {
    play = !play;

    if (!play) {
      $('#timeline-header').addClass('pink');
      $('#timeline-header i').removeClass('fa-play').addClass('fa-pause');
    } else {
      $('#timeline-header').removeClass('pink');
      $('#timeline-header i').addClass('fa-play').removeClass('fa-pause');
    }
  });

  $('#timeline-header').on('mouseover', function() {
    if (play) {
      $('#timeline-header').addClass('pink');
      $('#timeline-header i').addClass('fa-pause').removeClass('fa-play');
    }
  });

  $('#timeline-header').on('mouseout', function() {
    if (play) {
      $('#timeline-header').removeClass('pink');
      $('#timeline-header i').removeClass('fa-pause').addClass('fa-play');
    }
  })

  nextLayer();
}
