module.exports = React.createClass({
	changeBoardSize: function(e) {
		this.props.changeBoardSize(e.target.value);
	},
	render: function() {
		var sizes = [];
		for(var i=0;i<7;i++) {
			sizes.push(<option value={i+3} key={i+3}>{i+3}</option>);
		}
		return <div className="help">
			<select onChange={this.changeBoardSize}>
				{sizes}
			</select>
		</div>;
	}
});