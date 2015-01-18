module.exports = React.createClass({
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
		return <div className={classes} onClick={this.onclick}></div>;
	}
});