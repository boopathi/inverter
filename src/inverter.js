var Row = require('./Row');

module.exports = React.createClass({
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
				<Row
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
		return <div className={classes}>
			{rows}
		</div>;
	}
});