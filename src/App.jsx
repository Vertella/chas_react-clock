import "./App.css";
import React, { useState, useEffect } from "react";

function Clock({city, timeZone}) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const myInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(myInterval);
  }, []);

  return (
    <div style={{padding: '20px'}}>
      <h2>{city}</h2>
      <p>{timeZone}: {time}</p>
    </div>
  );
}


function Timer({startingTime}) {
  const [time, setTime] = useState(startingTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      // Calculating hours, minutes, and seconds
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;

      // Updating time
      setTime(time => time - 1);

      // If time is up, clear the interval
      if (time <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [time]);

  // Format time to display
  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  }

  return (
    <div style={{padding: '20px'}}>
      <h2>Timer</h2>
      <p>Hours: {formatTime(Math.floor(time / 3600))}</p>
      <p>Minutes: {formatTime(Math.floor((time % 3600) / 60))}</p>
      <p>Seconds: {formatTime(time % 60)}</p>
    </div>
  );

}

function App() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
      <Clock city="Stockholm" timeZone="CET" />
      <Timer startingTime={3600} />
      <Timer startingTime={300} />
      <Timer startingTime={60} />
  </div>
  );
}

export default App;
