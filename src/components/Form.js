import React from 'react';
class Form extends React.Component {
	state = {
		title: ""
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
		this.props.handTitle(this.state.title)
	}
	render() {
		const { title } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				Nhập title:<input 
				type="text" 
				placeholder="" 
				name="title"
				value={title}
				onChange={this.onChange}
				/>
				<button type="submit">Submit</button>
			</form>
		)
	}
}
export default Form;