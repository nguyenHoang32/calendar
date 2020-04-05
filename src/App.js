import React from 'react';
import './App.css';
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Control from './components/Control/Control';
import Form from './components/Form/Form';
import ListEvent from './components/ListEvent/ListEvent'
class App extends React.Component {
  state = {
    Events: [{
      title: "Event", start: new Date(),
    }],
    isAddEvent: false,
    isShowListEvent: false
  }
  onClick = (name) => {
    switch(name){
      case 'add': {
        this.setState({
          isAddEvent: !this.state.isAddEvent
        })
        break;
      }
      case 'event': {
        this.setState({
          isShowListEvent: !this.state.isShowListEvent
        })
        break;
      }
    }
  }
  onSubmit = (event) => {
    this.setState({
      isAddEvent: false,
      Events: this.state.Events.concat(event)
    })
  }
  render() {
    const { isAddEvent, isShowListEvent, Events } = this.state;
    return (
      <div className="App">
        <Control onClick={this.onClick}/>
        {isAddEvent && 
        <Form 
        onSubmit={this.onSubmit}
        />}
        {isShowListEvent && 
        <ListEvent 
        Events={Events}
        />}
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          header={{
            left: 'prev,next today',
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          events={this.state.Events}
        />
        

      </div>
    )
  }
}


export default App;
