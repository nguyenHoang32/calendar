import React from 'react';
import './App.css';
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Form from './components/Form'

class App extends React.Component {

  state = {
    Events: [{
      title: "Event", start: '2020-04-04'
    }],
    isShowForm: false
  }
  handDateClick = (info) => {
    return new Promise((resolve, reject) => {
      this.setState({
        isShowForm: true,
      })
      if(this.handTitle()){
        resolve();
      }
      else{
        reject();
      }
    }).then(() => {
      console.log(this.handTitle);
    }
    ).catch()
  }

  handTitle = (title) => {
    if(title){
      return title;
    }
    else{
      return false
    }
  }
  render() {
    const { isShowForm } = this.state;
    return (
      <div className="App">
        {isShowForm && <Form handTitle={this.handTitle} />}
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          header={{
            left: 'prev,next today',
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          events={this.state.Events}
          dateClick={this.handDateClick}
        />
      </div>
    )
  }
}


export default App;
