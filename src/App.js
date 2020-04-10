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
    infoEventClick: undefined
  };
  handleDateClick = (infoDateClick) => {
    console.log(infoDateClick)
    this.setState({
      isShowForm: true,
      infoDateClick,
    });
  };
  eventClick = (infoEventClick) => {
    this.setState({
      infoEventClick,
      isShowForm: true
    })
  }
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
    // let calendarApi = this.calendarRef.current.getApi();
    // //Update
    // if(this.state.infoEventClick){
    //   let eventApi = calendarApi.getEventById(eventFromChild.id);
    //   console.log(eventApi)//NULL
    //   eventApi.setProp('title', eventFromChild.title);
    //   eventApi.setStart(eventFromChild.start);
    //   eventApi.setEnd(eventFromChild.end)
    // }//ADD
    // else{
    //   calendarApi.addEvent(eventFromChild);
    //   this.setState({
    //     isShowForm: false,
    //     infoDateClick: undefined
    //   })
    // }
    let Events = (this.state.Events).splice();
    if(this.state.eventUpdate.id){
      const index = Events.findIndex(event => event.id === eventFromChild.id);
      Events.splice(index, 1, eventFromChild);
      this.setState({
        Events,
        isShowForm: false,
        eventUpdate: {}
      })
    }else{
      Events.push(eventFromChild);
      this.setState({
        Events,
        isShowForm: false
      })
    }
    
  };
    
  deleteEvent = (id) => {
    let Events = (this.state.Events).splice();
    const index = Events.findIndex(event => event.id === id);
    Events.splice(index, 1);
    this.setState({
      Events
    })
  };
  isUpdateEvent = (eventUpdate) =>{
    console.log(eventUpdate)
    this.setState({
      eventUpdate,
      isShowForm: true
    })
  }
  render() {
    let {
      isShowForm,
      isShowListEvent,
      Events,
      eventUpdate,
      infoDateClick,
      infoEventClick
    } = this.state;

    return (
      <div className="App">
        <Control onClick={this.onClick} />
        {isShowForm && (
          <Form
            onSubmit={this.onSubmit}
            infoDateClick={infoDateClick}
            infoEventClick={infoEventClick}
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
          eventClick={this.eventClick}
        />
      </div>
    );
  }
}

export default App;
