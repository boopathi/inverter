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
			nrows: 3,
			ncols: 3
		}), document.getElementById('react'));
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Row = __webpack_require__(2);

	module.exports = React.createClass({displayName: "exports",
		getInitialState: function() {
			var state = [];
			for(var i=0;i<this.props.nrows;i++) {
				var row = [];
				for(var j=0;j<this.props.ncols;j++) {
					row.push(false);
				}
				state.push(row);
			}
			return {
				game: false,
				state: state,
				nrows: this.props.nrows,
				ncols: this.props.ncols
			};
		},
		isGameOver: function() {
			var game = true;
			for(var i=0;i<this.state.nrows; i++) {
				for(var j=0;j<this.state.ncols; j++) {
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
					this.setState({
						game: true
					});
				} else if(this.state.game) {
					this.setState({
						game: false
					});
				}
			});
		},
		render: function() {
			var rows = [];
			for(var i=0;i<this.props.nrows;i++) {
				rows.push(
					React.createElement(Row, {
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
			return React.createElement("div", {className: classes}, 
				rows
			);
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Box = __webpack_require__(3);

	module.exports = React.createClass({displayName: "exports",
		render: function() {
			var boxes = [];
			for(var i=0;i<this.props.state.ncols;i++) {
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
		onclick: function() {
			this.props.nextState(this.props.i, this.props.j);
		},
		render: function() {
			var cx = React.addons.classSet;
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