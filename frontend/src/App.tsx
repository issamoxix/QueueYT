import React, { useEffect, useState } from 'react';
import './App.css';
import QueueContainer from './components/QueueContainer';
import VideoPlayer from "./components/VideoPlayer"
import { VideoData, fetchData } from './components/functions';



function App() {
  const [data, setdata] = useState<VideoData>({"videos":[], "token":""})
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('token')) {
      const tokenValue = queryParams.get('token');
      if (tokenValue) {
        fetchData(tokenValue).then((data) =>
          setdata(data.data)
          )
      }
    }
  }, []);
  return (
    <div className="App">
      <h1 className="App-title">Youtube Queue</h1>
      <div className="main-container">
        <VideoPlayer data={data} />
        <QueueContainer data={data} />
      </div>
    </div>
  );
}

export default App;
