import React from "react";
import "./style.css";
const generateId = () => {
  let id =
    Math.floor(Math.random() * 1000) + "-" + Math.floor(Math.random() * 1000);
  return id;
};
const splitDateStr = (dateStr) => {
  const arrDateStr = dateStr.split("T");
  const Day = arrDateStr[0];
  const Time = arrDateStr[1];
  return [Day, Time];
};
class Form extends React.Component {
  state = {
    id: undefined,
    title: "",
    startDay: undefined,
    startTime: undefined,
    endDay: undefined,
    endTime: undefined,
    allDay: false,
  };
  componentDidMount = () => {
    const { infoDateClick, eventUpdate } = this.props;
    if (infoDateClick) {
      let [startDay, startTime] = splitDateStr(infoDateClick.dateStr);
      if (startTime) {
        startTime = startTime.split("+")[0];
      }
      this.setState({
        startDay,
        startTime,
        allDay: infoDateClick.allDay
      });
    }
    if (eventUpdate.id) {
      const [startDay, startTime] = eventUpdate.start.split('.')[0].split('T');
      const [endDay, endTime] =  eventUpdate.end.split('.')[0].split('T');
      this.setState({
        id: eventUpdate.id,
        title: eventUpdate.title,
        startDay,
        startTime,
        endDay,
        endTime,
        allDay: eventUpdate.allDay,
      });
    }
  };
  componentWillReceiveProps = (nextProps, nextState) => {
    const { eventUpdate, infoDateClick } = nextProps;
    if (infoDateClick) {
      let [startDay, startTime] = splitDateStr(infoDateClick.dateStr);
      if (startTime) {
        startTime = startTime.split("+")[0];
      }
      this.setState({
        title: "",
        id: undefined,
        startDay,
        startTime,
        endDay: "",
        allDay: infoDateClick.allDay
      });
    } else if (eventUpdate.id !== this.state.id) {
      const [startDay, startTime] = eventUpdate.start.split('.')[0].split('T');
      const [endDay, endTime] =  eventUpdate.end.split('.')[0].split('T');
      this.setState({
        title: eventUpdate.title,
        startDay,
        startTime,
        endDay,
        endTime,
        id: eventUpdate.id,
        allDay: eventUpdate.allDay,
      });
    } else {
    }
  };
  onChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.type === "checkbox" && e.target.checked) {
      this.setState({
        [name]: value,
        startTime: undefined,
        endTime: undefined,
      });
    }
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let { startTime, endTime } = this.state;
    startTime = startTime === undefined ? "" : "T" + startTime;
    endTime = endTime === undefined ? "" : "T" + endTime;
    if (this.state.id) {
      const event = {
        title: this.state.title,
        start: this.state.startDay + startTime,
        end: this.state.endDay + endTime,
        id: this.state.id,
        allDay: this.state.allDay,
      };
      this.props.onSubmit(event);
    } else {
      const event = {
        title: this.state.title,
        start: this.state.startDay + startTime,
        end: this.state.endDay + endTime,
        id: generateId(),
        allDay: this.state.allDay,
      };
      this.props.onSubmit(event);
    }
    this.setState({
      id: undefined,
      title: undefined,
      startDay: undefined,
      startTime: undefined,
      endDay: undefined,
      endTime: undefined,
      allDay: undefined,
    });
  };
  render() {
    const { title, startDay, startTime, endDay, endTime, allDay } = this.state;
    return (
      <div className="container-form">
        {JSON.stringify(this.props.eventUpdate) === "{}" ? (
          <h1>ADD EVENT</h1>
        ) : (
          <h1>UPDATE EVENT</h1>
        )}
        <form onSubmit={this.onSubmit}>
          <div className="">
            <label>Title :</label>
            <input
              type="text"
              className=""
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
                required
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
              min={startDay}
            />
            {!allDay && (
              <input
                type="time"
                className="form-control"
                name="endTime"
                value={endTime}
                onChange={this.onChange}
                required
              />
            )}
          </div>
          <button type="submit" className="">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
