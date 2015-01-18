var Box = require('./Box');

module.exports = React.createClass({
	render: function() {
		var boxes = [];
		for(var i=0;i<this.props.state.ncols;i++) {
			boxes.push(
				<Box
					nextState={this.props.nextState}
					state={this.props.state}
					i={this.props.i}
					j={i}
					key={i} />
			)
		}
		return <div className='row'>
			{boxes}
		</div>;
	}
});