import React, { useEffect, useState } from 'react';
import './styles/App.css';
import QueueContainer from './components/QueueContainer';
import VideoPlayer from "./components/VideoPlayer"
import { VideoData, fetchData, fetchToken } from './components/functions';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router';




function App() {

  const item = useSelector((state: any) => state.item)
  const [data, setdata] = useState<VideoData>({ "videos": [], "token": "" })
  const navigation = useNavigate()
  const queryParams = new URLSearchParams(window.location.search);
  const tokenValue = queryParams.get('token');
  useEffect(() => {
    return () => {
      if (queryParams.has('token')) {
        const tokenValue = queryParams.get('token');
        if (tokenValue) {
          fetchData(tokenValue).then((data) =>
            setdata(data.data)
          )
        }
      } else {
        if (!new URLSearchParams(window.location.search).has('token')) {

          fetchToken().then((token) => {
            navigation("?token=" + token)
            fetchData(token).then((data) =>
              setdata(data.data)
            )
          }
          )
        }
      }
    }
  }, [tokenValue]);
  return (
    <div className="App">
      <h1 className="App-title">Youtube Queue Playing {item}</h1>
      <div className="main-container">
        <VideoPlayer data={data} />
        <QueueContainer data={data} />
      </div>
    </div>
  );
}

export default App;
