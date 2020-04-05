import React from 'react';
import './Control.css'
class Control extends React.Component {
	onClick = (e) => {
		this.props.onClick(e.target.name)
	}
	render() {
		return (
			<div className="control">
				<button
					type="button"
					className="btn btn-primary"
					name="add"
					onClick={this.onClick}>Add Event</button>
				<button
					type="button"
					className="btn btn-primary"
					name="event"
					onClick={this.onClick}>View Event</button>
			</div>
		)
	}
}
export default Control;