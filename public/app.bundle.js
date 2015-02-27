(function(e, a) { for(var i in a) e[i] = a[i]; }(this, webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Inverter = __webpack_require__(2);
	var LevelMatrices = __webpack_require__(3);

	var Board = React.createClass({displayName: "Board",
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
			return React.createElement(Inverter, {
				nrows: LevelMatrices[this.state.level].length, 
				ncols: LevelMatrices[this.state.level][0].length, 
				levelup: this.levelup, 
				leveldown: this.leveldown, 
				level: this.state.level, 
				matrix: LevelMatrices[this.state.level]});
		}
	});

	document.addEventListener('DOMContentLoaded', function() {
		React.render(React.createElement(Board, null), document.getElementById('react'));
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

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1),
		Row = __webpack_require__(5),
		Title = __webpack_require__(6),
		Options = __webpack_require__(7),
		LevelMatrices = __webpack_require__(3);

	module.exports = React.createClass({displayName: "exports",
		getInitialState: function() {
			return this.newState("empty");
		},
		componentWillReceiveProps: function(props) {
			this.setState(this.newState('board', props));
		},
		newState: function(type, props) {
			if(typeof props === 'undefined') props = this.props;
			var state = [];
			for(var i=0;i<props.nrows;i++) {
				var row = [];
				for(var j=0;j<props.ncols;j++) {
					if(type === "board")
						row.push(!props.matrix[i][j]);
					else if(type === "random")
						row.push(Math.random() >= 0.8);
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
		reset: function(type) {
			this.setState(this.newState(type || "board"));
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
			var reset = React.createElement("div", {className: "reset-btn", onClick: this.props.levelup}, "Level ", this.props.level+1)
			if(this.props.level === LevelMatrices.length - 1) {
				reset = React.createElement("div", {className: "reset-btn"}, "Game Complete")
			}
			return React.createElement("div", {className: "container"}, 
				React.createElement(Title, {game: this.state.game, level: this.props.level}), 
				React.createElement(Options, {
					leveldown: this.props.leveldown, 
					levelup: this.props.levelup, 
					reset: this.reset}), 
				React.createElement("div", {className: classes}, 
					React.createElement("div", {className: "board"}, 
						rows, 
						React.createElement("div", {className: overlay_classes}, 
							reset
						)
					)
				)
			)
		}
	});

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
		// 0
		[
			[1,1,1],
			[1,1,1],
			[1,1,1]
		],
		// 1
		[
			[0,0,0,0,0],
			[0,0,1,0,0],
			[0,1,1,1,0],
			[0,0,1,0,0],
			[0,0,0,0,0]
		],
		// 2
		[
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,1,0,0],
			[0,1,0,1,0],
			[0,1,0,1,0]
		],
		// 3
		[
			[0,0,1,1,1],
			[1,0,0,1,0],
			[1,1,0,0,0],
			[1,0,0,1,0],
			[0,0,1,1,1]
		],
		// 4
		[
			[0,0,0,0,0],
			[0,1,0,0,0],
			[0,1,0,0,0],
			[1,1,1,0,0],
			[1,0,0,1,1]
		],
		// 5
		[
			[0,1,1,0,0],
			[1,0,0,1,1],
			[0,0,0,1,1],
			[1,0,0,1,1],
			[0,1,1,0,0]
		],
		// 6
		[
			[0,0,1,0,0],
			[0,0,0,0,0],
			[1,0,1,0,1],
			[0,0,0,0,0],
			[0,0,1,0,0]
		],
		// 7
		[
			[0,1,1,0,1],
			[0,0,0,0,1],
			[1,0,1,1,1],
			[0,0,1,0,1],
			[1,1,1,0,1]
		],
		// 8
		[
			[1,1,1,1,1],
			[1,1,0,1,1],
			[1,0,1,0,0],
			[0,1,0,0,1],
			[1,1,1,1,0]
		],
		// 9
		[
			[1,1,0,1,0],
			[0,1,1,1,0],
			[1,1,0,1,0],
			[0,1,1,1,0],
			[1,1,1,1,1]
		],
		// 10
		[
			[0,1,1,1,1],
			[0,0,1,0,0],
			[1,0,1,0,0],
			[1,1,0,0,0],
			[1,0,1,1,0]
		],
		// 11
		[
			[1,0,0,1,1],
			[0,0,1,1,1],
			[0,1,1,0,1],
			[1,1,1,0,1],
			[0,1,1,0,0]
		],
		// 12
		[
			[1,0,0,1,0],
			[0,0,0,0,1],
			[1,1,0,0,0],
			[1,1,0,0,0],
			[0,0,1,0,0]
		],
		// 13
		[
			[0,0,0,0,1],
			[0,0,1,0,0],
			[0,1,1,0,1],
			[1,0,1,1,0],
			[0,1,1,1,1]
		],
		// 14
		[
			[1,0,0,1,1],
			[1,1,0,1,0],
			[0,0,1,0,1],
			[0,0,1,0,1],
			[0,1,0,0,1]
		],
		// 15
		[
			[1,1,1,1,0],
			[1,0,1,0,1],
			[1,1,1,0,1],
			[0,1,1,1,0],
			[1,1,0,1,1]
		],
		// 16
		[
			[1,1,0,1,1],
			[0,0,0,1,1],
			[0,0,0,1,0],
			[1,1,1,0,0],
			[0,1,1,0,0]
		],
		// 17
		[
			[0,1,1,1,1],
			[1,0,0,0,1],
			[0,0,1,0,1],
			[1,0,0,0,1],
			[1,1,1,0,0]
		],
		// 18
		[
			[1,1,0,1,0],
			[0,0,0,1,0],
			[1,1,1,1,1],
			[1,1,0,1,1],
			[1,1,0,1,0]
		],
		// 19
		[
			[1,1,1,1,1],
			[1,1,1,1,1],
			[1,1,1,1,1],
			[1,1,1,1,1],
			[1,1,1,1,1]
		],
		// 20
		[
			[0,0,0,0,1],
			[1,0,1,1,0],
			[0,1,0,0,0],
			[0,0,0,1,0],
			[1,0,0,1,0]
		]
	];

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Box = __webpack_require__(33);

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

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	module.exports = React.createClass({displayName: "exports",
		render: function() {
			var message;
			if(!this.props.game) {
				message = React.createElement("div", {className: "title"}, 
					React.createElement("div", null, "Turn ", '\u00A0', this.props.game ? 'OFF' : 'ON', '\u00A0', " the lights !!!"), 
					React.createElement("div", null, "Level ", '\u00A0', " ", this.props.level)
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

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	module.exports = React.createClass({displayName: "exports",
		resetEmpty: function() {
			this.props.reset('empty');
		},
		resetRandom: function() {
			this.props.reset('random');
		},
		resetBoard: function() {
			this.props.reset('board');
		},
		render: function() {
			return React.createElement("div", {className: "opts"}, 
				React.createElement("div", {className: "reset-btn", onClick: this.props.leveldown}, "Prev"), 
				React.createElement("div", {className: "reset-btn", onClick: this.resetBoard}, "Reset"), 
				React.createElement("div", {className: "reset-btn", onClick: this.props.levelup}, "Next")
			);
		}
	});

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
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

});))