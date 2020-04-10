import React from "react";
import "./style.css";
const generateId = () => {
  let id =
    Math.floor(Math.random() * 1000) + "-" + Math.floor(Math.random() * 1000);
  return id;
};
const splitDateStr = (dateStr) => {
  const arrDateStr = dateStr.split("T");
  const startDay = arrDateStr[0];
  const startTime = arrDateStr[1];
  return [startDay, startTime];
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
    console.log(eventUpdate)
    if(infoDateClick){
      console.log('infoDateClick')
      this.setState({
        startDay: infoDateClick.dateStr
      })
    }
    if (eventUpdate.id) {
      console.log('Event Update')
      this.setState({
        id: eventUpdate.id,
        title: eventUpdate.title,
        startDay: eventUpdate.start,
        endDay: eventUpdate.end,
      });
    }
  };
  componentWillReceiveProps = (nextProps, nextState) => {
    const { eventUpdate, infoDateClick } = nextProps;
    if(infoDateClick){
      
      this.setState({
        title: '',
        id: undefined,
        startDay: infoDateClick.dateStr,
        endDay: ''
      })
    }
    else if(eventUpdate.id !== this.state.id){
      
      this.setState({
        title: eventUpdate.title,
        startDay:eventUpdate.start,
        endDay:eventUpdate.end,
        id: eventUpdate.id,
      }, )
    }else{

    }
  }
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
    if (this.state.id) {
      const event = {
        title: this.state.title,
        start: this.state.startDay,
        end: this.state.endDay,
        id: this.state.id
      };
      this.props.onSubmit(event);
    } else {
      const event = {
        title: this.state.title,
        start: this.state.startDay,
        end: this.state.endDay,
        id: generateId(),
      };
      this.props.onSubmit(event);
    }
    this.setState({
      id: undefined,
      title: undefined,
      startDay: undefined,
      endDay: undefined
    })
  };

  render() {
    const { title, startDay, startTime, endDay, endTime, allDay } = this.state;
    
    return (
      <div className="container-form">
        {/* {JSON.stringify(this.props.eventUpdate) === '{}' ? <h1>ADD EVENT</h1> : <h1>UPDATE EVENT</h1>} */}
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
            {/* {!allDay && (
              <input
                type="time"
                className=""
                name="startTime"
                value={startTime}
                onChange={this.onChange}
              />
            )} */}
            {/* Cả ngày :
            <input
              type="checkbox"
              name="allDay"
              checked={allDay}
              onChange={this.onChange}
            /> */}
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
            {/* {!allDay && (
              <input
                type="time"
                className="form-control"
                name="endTime"
                value={endTime}
                onChange={this.onChange}
              />
            )} */}
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
