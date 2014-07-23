console.log("VisitorTracker v0.0")

var noble = require('noble')
var mqtt = require('mqtt')

client = mqtt.createClient(1883, 'localhost');

noble.on('stateChange', function(state) {
	if (state === 'poweredOn') {
		noble.startScanning();
	} else {
		noble.stopScanning();
	}
});

noble.on('discover', function(peripheral) {
	console.log("  discover[" + peripheral.uuid + "]")

	peripheral.on('connect', function(bla) {
		console.log("   connect[" + peripheral.uuid + "] " + bla)
		client.publish('presence', JSON.stringify({
			uuid          : peripheral.uuid,
			advertisement : peripheral.advertisement,
                        state         : true,
			time          : new Date().getTime()
		}));
	});

	peripheral.on('disconnect', function() {
		console.log("disconnect[" + peripheral.uuid + "]")
		client.publish('presence', JSON.stringify({
			uuid          : peripheral.uuid,
			advertisement : peripheral.advertisement,
                        state         : false,
			time          : new Date().getTime()
		}));
	});

	peripheral.connect(function(error) {
		console.log("connecting[" + peripheral.uuid + "] " + error)
	});

	// peripheral.on('rssiUpdate', callback(rssi))
	// {
	// console.log(peripheral.uuid + " rssi")
	// });
	//
	// peripheral.on('disconnect', callback)
	// {
	// console.log(peripheral.uuid + " disconnect")
	// });

	// client.publish('presence', JSON.stringify({
	// 	uuid : peripheral.uuid,
	// 	advertisement : peripheral.advertisement,
	// 	time : new Date().getTime()
	// }));
});
