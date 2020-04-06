import React from 'react';
import './style.css';
class Form extends React.Component {
	state = {
		title: "",
		dayStart: undefined,
		startTime: undefined,
		dayEnd: undefined,
		endTime: undefined
	}
	onChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		})
	}
	onSubmit = e => {
		e.preventDefault();
		const { title, dayStart, startTime, dayEnd, endTime } = this.state;
		this.props.onSubmit({
			title: title,
			start: dayStart + 'T' + startTime,
			end: dayEnd + 'T' + endTime,
		});

	}
	componentDidMount = () => {

	}
	render() {
		const { title, dayStart, startTime, dayEnd, endTime } = this.state;
		return (
			<div className="container-form">
				<form onSubmit={this.onSubmit}>
					<div className="">
						<label>Title :</label>
						<input
							type="text"
							className=" "
							name="title"
							value={title}
							onChange={this.onChange}
							required
						/>
					</div>
					<div className="">
						<label>Bắt đầu: </label>
						<input
							type="date"
							className=""
							name="dayStart"
							value={dayStart}
							onChange={this.onChange}
							required
							pattern="\d{4}-\d{2}-\d{2}"
						/>
						<input
							type="time"
							className=""
							name="startTime"
							value={startTime}
							onChange={this.onChange}
						/>
					</div>
					<div className="">
						<label>Kết thúc: </label>
						<input
							type="date"
							className="form-control"
							name="dayEnd"
							value={dayEnd}
							onChange={this.onChange}
						/>
						<input
							type="time"
							className="form-control"
							name="endTime"
							value={endTime}
							onChange={this.onChange}
						/>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
}
export default Form;