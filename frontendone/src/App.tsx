import React from 'react';
import './App.css';
import QueueContainer from './components/QueueContainer';
import VideoPlayer from "./components/VideoPlayer"


function App() {
  const data = {
    videos: ["tY_3bDHdiiA", "l78x5cADWJM"]
  }
  return (
    <div className="App">
      <h1 className="App-title">Youtube Queue</h1>
      <div className="main-container">
        <VideoPlayer data={data} />
        <QueueContainer data= {data} />
      </div>
    </div>
  );
}

export default App;
