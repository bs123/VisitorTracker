console.log("VisitorTracker v0.0")

var noble = require('noble')
var mqtt  = require('mqtt')

client = mqtt.createClient(1883, 'localhost');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
    client.publish('presence', peripherial);
});

