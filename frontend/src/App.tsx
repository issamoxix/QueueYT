import React, { useEffect} from 'react';
import './styles/App.css';
import QueueContainer from './components/QueueContainer';
import VideoPlayer from "./components/VideoPlayer"
import { fetchData, fetchToken } from './components/functions';
import { useDispatch} from "react-redux"
import { useNavigate } from 'react-router';
import { addQueue } from './store/actions';
import Controller from './components/Controller';




function App() {
  const navigation = useNavigate()
  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(window.location.search);
  const tokenValue = queryParams.get('token');
  useEffect(() => {
    return () => {
      if (queryParams.has('token')) {
        const tokenValue = queryParams.get('token');
        if (tokenValue) {
          fetchData(tokenValue).then((data) => {
            dispatch(addQueue(data.data))
          }
          )
        }
      } else {
        if (!new URLSearchParams(window.location.search).has('token')) {
          
          fetchToken().then((token) => {
            navigation("?token=" + token)
            fetchData(token).then((data) =>
            dispatch(addQueue(data.data))
            )
          }
          )
        }
      }
    }
  }, [tokenValue]);
  return (
    <div className="App">
      <h1 className="App-title">Youtube Queue</h1>
      <div className="main-container">
        <VideoPlayer />
        <QueueContainer />
      </div>
      <Controller token={tokenValue} />
    </div>
  );
}

export default App;
