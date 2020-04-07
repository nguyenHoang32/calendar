import React from "react";
import "./style.css";
const generateId = () => {
  // let id =
  //   Math.floor(Math.random() * 1000) + "-" + Math.floor(Math.random() * 1000);
  let id = Math.floor(Math.random() * 10);
  return id;
};
class Form extends React.Component {
  state = {
    title: "",
    startDay: undefined,
    startTime: undefined,
    endDay: undefined,
    endTime: undefined,
    allDay: false,
  };
  componentDidMount = () => {
		if (this.props.eventUpdate.id) { // Vô lý
      const { title, start, end, allDay } = this.props.eventUpdate;
      let arrStart = start.split("T");
      let arrEnd = end.split("T");
      let startDay = arrStart[0];
      let startTime = arrStart[1];
      let endDay = arrEnd[0];
      let endTime = arrEnd[1];
      this.setState({
        title,
        startDay,
        startTime,
        endDay,
        endTime,
        allDay,
      });
		} 
		else {
		
    }
  };
  onChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { title, startDay, startTime, endDay, endTime, allDay } = this.state;
    let start, end;
    if (startTime) {
      start = startDay + "T" + startTime;
      end = endDay + "T" + endTime;
    } else {
      start = startDay;
      end = endDay;
    }
    this.props.onSubmit({
      id: generateId(),
      title: title,
      start,
      end,
      allDay,
    });
  };

  render() {
    const { title, startDay, startTime, endDay, endTime, allDay } = this.state;
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
          {/* Bat dau */}
          <div className="">
            <label>Bắt đầu: </label>
            <input
              type="date"
              className=""
              name="startDay"
              value={startDay}
              onChange={this.onChange}
              required
            />
            {!allDay && (
              <input
                type="time"
                className=""
                name="startTime"
                value={startTime}
                onChange={this.onChange}
              />
            )}
            Cả ngày :
            <input
              type="checkbox"
              name="allDay"
              checked={allDay}
              onChange={this.onChange}
            />
          </div>
          {/* Ket thuc */}
          <div className="">
            <label>Kết thúc: </label>
            <input
              type="date"
              className="form-control"
              name="endDay"
              value={endDay}
              onChange={this.onChange}
            />
            {!allDay && (
              <input
                type="time"
                className="form-control"
                name="endTime"
                value={endTime}
                onChange={this.onChange}
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
