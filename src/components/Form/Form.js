import React from 'react';
import './style.css';
class Form extends React.Component {
	state = {
		title: "",
		dayStart: undefined,
		dayEnd: undefined
	}
	onChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		})
	}
	onSubmit = e => {
		e.preventDefault()
		console.log(this.state)
	}
	componentDidMount = () => {

	}
	render() {
		const { title, dayStart, dayEnd } = this.state;
		return (
			<div className="container-form">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Tên :</label>
						<input
							type="text"
							className="form-control"
							name="title"
							value={title}
							onChange={this.onChange}
							required
						/>
					</div>
					<div className="form-group">
						<label>Ngày bắt đầu: </label>
						<input
							type="date"
							className="form-control"
							name="dayStart"
							value={dayStart}
							onChange={this.onChange}
							required
							pattern="\d{4}-\d{2}-\d{2}"
						/>
					</div>
					<div className="form-group">
						<label>Ngày kết thúc: </label>
						<input
							type="date"
							className="form-control"
							name="dayEnd"
							value={dayEnd}
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