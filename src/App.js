import React from "react";
import "./App.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Control from "./components/Control/Control";
import Form from "./components/Form/Form";
import ListEvent from "./components/ListEvent/ListEvent";
class App extends React.Component {
  calendarRef = React.createRef();
  state = {
    Events: [],
    eventUpdate: {},
    isShowForm: false,
    isShowListEvent: false,
    infoDateClick: undefined,
  };
  getState = () => {
    console.log(this.state)
  }
  handleDateClick = (infoDateClick) => {
    this.setState({
      eventUpdate: {},
      isShowForm: true,
      infoDateClick,
    });
  };
  handleEventClick = (infoEventClick) => {
    let startDay = JSON.parse(JSON.stringify(infoEventClick.event.start)).split('T')[0] ;
    let endDay = JSON.parse(JSON.stringify(infoEventClick.event.end)).split('T')[0] ;
      const eventUpdate = {
      title: infoEventClick.event.title,
      start: startDay,
      end: endDay,
      id: infoEventClick.event.id
    }
    this.setState({
      eventUpdate: {...eventUpdate},
      isShowForm: true,
    });
  };
  onClick = (name) => {
    switch (name) {
      case "add": {
        this.setState({
          isShowForm: !this.state.isShowForm,
        });
        break;
      }
      case "event": {
        this.setState({
          isShowListEvent: !this.state.isShowListEvent,
        });
        break;
      }
      default:
    }
  };
  onSubmit = (eventFromChild) => {
    let Events = JSON.parse(JSON.stringify(this.state.Events));
    if(this.state.eventUpdate.id){
      const index = Events.findIndex(event => event.id === eventFromChild.id);
      Events.splice(index, 1, eventFromChild);
      this.setState({
        Events,
        isShowForm: false,
        eventUpdate: {},
        infoDateClick: undefined
      })
    }else{
      Events.push(eventFromChild);
      this.setState(
        {
          Events: Events,
          isShowForm: false,
          infoDateClick: undefined
        },
        
      );
    }
  };
  deleteEvent = (id) => {
    let Events = JSON.parse(JSON.stringify(this.state.Events));
    const index = Events.findIndex((event) => event.id === id);
    Events.splice(index, 1);
    this.setState({
      Events,
    });
  };
  isUpdateEvent = (eventUpdate) => {
    this.setState({
      eventUpdate,
      isShowForm: true,
      infoDateClick: undefined
    });
  };
  render() {
    let {
      isShowForm,
      isShowListEvent,
      Events,
      eventUpdate,
      infoDateClick,
      
    } = this.state;

    return (
      <div className="App">
      <button onClick={this.getState}>Get state</button>
        <Control onClick={this.onClick} />
        {isShowForm && (
          <Form
            onSubmit={this.onSubmit}
            infoDateClick={infoDateClick}
            
            eventUpdate={eventUpdate}
          />
        )}
        {isShowListEvent && (
          <ListEvent
            Events={Events}
            deleteEvent={this.deleteEvent}
            isUpdateEvent={this.isUpdateEvent}
          /> 
        )}
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          // events={Events}
          ref={this.calendarRef}
          events={Events}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
        />
      </div>
    );
  }
}

export default App;
