module.exports = React.createClass({
	render: function() {
		var message;
		if(!this.props.game) {
			message = <div className="title">
				Turn {'\u00A0'}{this.props.game ? 'OFF' : 'ON' }{'\u00A0'} the lights !!!
			</div>;
		} else {
			message = (<div className="title wish">
				Congratulations !!!
			</div>);
		}
		return message;
	}
});