module.exports = React.createClass({
	onclick: function() {
		this.props.nextState(this.props.i, this.props.j);
	},
	render: function() {
		var cx = React.addons.classSet;
		//console.log(this.props.i, this.props.j);
		var classes = cx({
			box: true,
			on: this.props.state.state[this.props.i][this.props.j],
			off: !this.props.state.state[this.props.i][this.props.j],
			focus: this.props.state.focus[0] === this.props.i && this.props.state.focus[1] === this.props.j
		});
		return <div className={classes} onClick={this.onclick}></div>;
	}
});
