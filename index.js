var Inverter = require('./src/inverter');
document.addEventListener('DOMContentLoaded', function() {
	React.render(React.createElement(Inverter, {
		nrows: 3,
		ncols: 3
	}), document.getElementById('react'));
});