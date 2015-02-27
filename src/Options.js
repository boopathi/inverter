var React = require('react');
module.exports = React.createClass({
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
		return <div className="opts">
			<div className="reset-btn" onClick={this.props.leveldown}>Prev</div>
			<div className="reset-btn" onClick={this.resetBoard}>Reset</div>
			<div className="reset-btn" onClick={this.props.levelup}>Next</div>
		</div>;
	}
});