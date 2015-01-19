(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Inverter = __webpack_require__(1);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Row = __webpack_require__(2),
		Title = __webpack_require__(3),
		Options = __webpack_require__(4);

	module.exports = React.createClass({displayName: "exports",
		getInitialState: function() {
			return this.newState(this.props.nrows, this.props.ncols);
		},
		newState: function(type) {
			var state = [];
			for(var i=0;i<this.props.nrows;i++) {
				var row = [];
				for(var j=0;j<this.props.ncols;j++) {
					if(type === "random")
						row.push(Math.random() >= 0.5);
					else
						row.push(false);
				}
				state.push(row);
			}
			return {
				game: false,
				state: state
			};
		},
		reset: function() {
			this.setState(this.newState(this.props.nrows, this.props.ncols));
		},
		changeBoardSize: function(n) {
			this.setProps({
				nrows: n,
				ncols: n
			});
		},
		isGameOver: function() {
			var game = true;
			for(var i=0;i<this.props.nrows; i++) {
				for(var j=0;j<this.props.ncols; j++) {
					if(this.state.state[i][j] === false) {
						game=false;
						break;
					}
				}
			}
			return game;
		},
		invert: function(state, i,j) {
			var nr = this.props.nrows, nc = this.props.ncols;
			if(i>=0 && i<nr && j>=0 && j<nc) {
				state[i][j] = !state[i][j];
			}
		},
		nextState: function(i,j) {
			var state = this.state.state.slice();
			this.invert(state, i-1, j+0);
			this.invert(state, i+0, j-1);
			this.invert(state, i+0, j+0);
			this.invert(state, i+0, j+1);
			this.invert(state, i+1, j+0);
			this.setState({
				state: state
			}, function() {
				if(this.isGameOver()) {
					this.setState({ game: true });
				}
			});
		},
		render: function() {
			var rows = [];
			for(var i=0;i<this.props.nrows;i++) {
				rows.push(
					React.createElement(Row, {
						ncols: this.props.ncols, 
						nextState: this.nextState, 
						i: i, 
						state: this.state, 
						key: i})
				);
			}
			var classes = React.addons.classSet({
				inverter: true,
				gamedone: this.state.game
			});
			var overlay_classes = React.addons.classSet({
				overlay: true,
				visible: this.state.game
			});
			var reset = React.createElement("div", {className: overlay_classes}, 
				React.createElement("div", {className: "reset-btn", onClick: this.reset}, "Reset")
			);
			return React.createElement("div", {className: "container"}, 
				React.createElement(Title, {game: this.state.game}), 
				/*<Options
					changeBoardSize={this.changeBoardSize}
					game={this.state.game}
					nrows={this.props.nrows}
					ncols={this.props.ncols} />*/
				React.createElement("div", {className: classes}, 
					React.createElement("div", {className: "board"}, 
						rows, 
						reset
					)
				)
			)
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Box = __webpack_require__(5);

	module.exports = React.createClass({displayName: "exports",
		render: function() {
			var boxes = [];
			for(var i=0;i<this.props.ncols;i++) {
				boxes.push(
					React.createElement(Box, {
						nextState: this.props.nextState, 
						state: this.props.state, 
						i: this.props.i, 
						j: i, 
						key: i})
				)
			}
			return React.createElement("div", {className: "row"}, 
				boxes
			);
		}
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
		render: function() {
			var message;
			if(!this.props.game) {
				message = React.createElement("div", {className: "title"}, 
					"Turn ", '\u00A0', this.props.game ? 'OFF' : 'ON', '\u00A0', " the lights !!!"
				);
			} else {
				message = (React.createElement("div", {className: "title wish"}, 
					"Congratulations !!!"
				));
			}
			return message;
		}
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
		changeBoardSize: function(e) {
			this.props.changeBoardSize(e.target.value);
		},
		render: function() {
			var sizes = [];
			for(var i=0;i<7;i++) {
				sizes.push(React.createElement("option", {value: i+3, key: i+3}, i+3));
			}
			return React.createElement("div", {className: "help"}, 
				React.createElement("select", {onChange: this.changeBoardSize}, 
					sizes
				)
			);
		}
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
		onclick: function() {
			this.props.nextState(this.props.i, this.props.j);
		},
		render: function() {
			var cx = React.addons.classSet;
			//console.log(this.props.i, this.props.j);
			var classes = cx({
				box: true,
				on: this.props.state.state[this.props.i][this.props.j],
				off: !this.props.state.state[this.props.i][this.props.j]
			});
			return React.createElement("div", {className: classes, onClick: this.onclick});
		}
	});

/***/ }
/******/ ])))