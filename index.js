var Inverter = require('./src/inverter');
var LevelMatrices = require('./src/LevelMatrices');

var Board = React.createClass({
	getInitialState: function() {
		return {
			level: 0
		};
	},
	levelup: function() {
		if(this.state.level < LevelMatrices.length - 1)
			this.setState({
				level: this.state.level + 1
			});
	},
	leveldown: function() {
		if(this.state.level > 0)
			this.setState({
				level: this.state.level - 1
			});
	},
	render: function() {
		return <Inverter
			nrows={LevelMatrices[this.state.level].length}
			ncols={LevelMatrices[this.state.level][0].length}
			levelup={this.levelup}
			leveldown={this.leveldown}
			level={this.state.level}
			matrix={LevelMatrices[this.state.level]} />;
	}
});

document.addEventListener('DOMContentLoaded', function() {
	React.render(<Board />, document.getElementById('react'));
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
