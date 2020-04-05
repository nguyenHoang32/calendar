import React from 'react';
class ListEvent extends React.Component {
	render() {
		const { Events } = this.props;
		const result = Events.map((event, index) => {
			return (
				<tr>
					<td>{index + 1}</td>
					<td>{event.title}</td>
					<td></td>
					<td></td>
				</tr>
			)
		})
		return (
			<div>
				<table class="table table-striped">
					<thead>
						<tr>
							<th scope="col">STT</th>
							<th scope="col">Tên</th>
							<th scope="col">Bắt đầu</th>
							<th scope="col">Kết thúc</th>
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