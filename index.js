var Inverter = require('./src/inverter');
document.addEventListener('DOMContentLoaded', function() {
	React.render(React.createElement(Inverter, {
		nrows: 6,
		ncols: 6
	}), document.getElementById('react'));
});

if(navigator.serviceWorker) {
	navigator
		.serviceWorker
		.register('./sw.js')
		.then(function(reg) {
			console.log('Service Worker registered, You can play this game offline now');
		})
		.catch(function(e) {
			console.log('Unable to register service worker');
			console.log(e);
		});
} else {
	console.log('Service worker not supported');
}