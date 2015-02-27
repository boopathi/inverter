var React = require('react'),
	Row = require('./Row'),
	Title = require('./Title'),
	Options = require('./Options'),
	LevelMatrices = require('./LevelMatrices');

module.exports = React.createClass({
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
				<Row
					ncols={this.props.ncols}
					nextState={this.nextState}
					i={i}
					state={this.state}
					key={i} />
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
		var reset = <div className="reset-btn" onClick={this.props.levelup} >Level {this.props.level+1}</div>
		if(this.props.level === LevelMatrices.length - 1) {
			reset = <div className="reset-btn" >Game Complete</div>
		}
		return <div className="container">
			<Title game={this.state.game} level={this.props.level} />
			<Options
				leveldown={this.props.leveldown}
				levelup={this.props.levelup}
				reset={this.reset} />
			<div className={classes}>
				<div className="board">
					{rows}
					<div className={overlay_classes}>
						{reset}
					</div>
				</div>
			</div>
		</div>
	}
});