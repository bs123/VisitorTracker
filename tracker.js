console.log("VisitorTracker v0.0")

var noble = require('noble')
var mqtt  = require('mqtt')
//var util = require('util')

client = mqtt.createClient(1883, 'localhost');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripherial) {
  console.log(peripherial.uuid)
  client.publish('presence', JSON.stringify({uuid: peripherial.uuid, advertisement: peripherial.advertisement, time: new Date().getTime()}))
});

