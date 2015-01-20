module.exports = React.createClass({
	resetEmpty: function() {
		this.props.reset('empty');
	},
	resetRandom: function() {
		this.props.reset('random');
	},
	render: function() {
		return <div className="opts">
			<div className="reset-btn" onClick={this.resetEmpty}>Empty</div>
			<div className="reset-btn" onClick={this.resetRandom}>Random</div>
		</div>;
	}
});