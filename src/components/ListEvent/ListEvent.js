import React from 'react';
class ListEvent extends React.Component {
	render() {
		const { Events } = this.props;
		const result = Events.map((event, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{event.title}</td>
					<td>{event.start}</td>
					<td>{event.end}</td>
					<td>
					<button
					onClick={() => {
						
						this.props.isUpdateEvent(event)
						}}>
						Chỉnh sửa
					</button>
					<button 
					onClick={() => this.props.deleteEvent(event.id)}
					>Xóa</button></td>
				</tr>
			)
		});
		return (
			<div>
				<table className="">
					<thead>
						<tr>
							<th>STT</th>
							<th>Tên</th>
							<th>Bắt đầu</th>
							<th>Kết thúc</th>
							<th>Hành động</th>
						</tr>
					</thead>
					<tbody>
						{result}
					</tbody>
				</table>
			</div>
		)
	}
}
export default ListEvent;