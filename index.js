var Inverter = require('./src/inverter');
document.addEventListener('DOMContentLoaded', function() {
	React.render(React.createElement(Inverter, {
		nrows: 6,
		ncols: 6
	}), document.getElementById('react'));
});