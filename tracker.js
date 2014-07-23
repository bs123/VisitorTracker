console.log("VisitorTracker v0.0")

var noble = require('noble');

noble.on('discover', function(peripheral) {
  console.log(peripheral);
});

noble.startScanning();


