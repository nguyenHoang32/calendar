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
    isAddEvent: false,
    isShowListEvent: false,
  };

  onClick = (name) => {
    switch (name) {
      case "add": {
        this.setState({
          isAddEvent: !this.state.isAddEvent,
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
    const { eventUpdate, Events } = this.state;
    if (eventUpdate.id) {
      const index = Events.findIndex((event) => event.id === eventFromChild.id);
      let calendar = this.calendarRef.current.getApi();
      
      let event = calendar.getEvents()[index];
     
      event.setDates(eventFromChild.start, eventFromChild.end, eventFromChild.allDay);
      
      Events.splice(index, 1, eventFromChild);
      this.setState({
        isAddEvent: false,
        Events: Events,
        eventUpdate: {},
      });
    } else {
      this.setState({
        isAddEvent: false,
        Events: this.state.Events.concat(eventFromChild),
      });
    }
  };
  deleteEvent = (id) => {
    let { Events } = this.state;
    let index = Events.findIndex((event) => event.id === id);

    let calendar = this.calendarRef.current.getApi();
    let event = calendar.getEventById(id);
    console.log(event)
    event.remove();

    Events.splice(index, 1);
    this.setState({
      Events: Events,
    });
  };
  isUpdateEvent = (event) => {
    this.setState({
      isAddEvent: true,
      eventUpdate: event,
    });
  };
  render() {
    let { isAddEvent, isShowListEvent, Events, eventUpdate } = this.state;
    
    return (
      <div className="App">
        <Control onClick={this.onClick} />
        {isAddEvent && (
          <Form onSubmit={this.onSubmit} eventUpdate={eventUpdate} />
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
          events={Events}
          ref={this.calendarRef}
          editable={true}
        />
      </div>
    );
  }
}

export default App;
