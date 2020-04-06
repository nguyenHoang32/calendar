import React from 'react';
class ListEvent extends React.Component {
	render() {
		const { Events } = this.props;
		const result = Events.map((event, index) => {
			return (
				<tr>
					<td>{index + 1}</td>
					<td>{event.title}</td>
					<td>{event.start}</td>
					<td>{event.end}</td>
					<td>Chỉnh sửa, Xóa</td>
				</tr>
			)
		})
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