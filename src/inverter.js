var Row = require('./Row'),
	Title = require('./Title'),
	Options = require('./Options');

module.exports = React.createClass({
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
		var reset = <div className={overlay_classes}>
			<div className="reset-btn" onClick={this.reset} >Reset</div>
		</div>;
		return <div className="container">
			<Title game={this.state.game} />
			{/*<Options
				changeBoardSize={this.changeBoardSize}
				game={this.state.game}
				nrows={this.props.nrows}
				ncols={this.props.ncols} />*/}
			<div className={classes}>
				<div className="board">
					{rows}
					{reset}
				</div>
			</div>
		</div>
	}
});