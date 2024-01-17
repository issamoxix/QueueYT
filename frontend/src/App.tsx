import React, { useEffect} from 'react';
import './styles/App.css';
import QueueContainer from './components/QueueContainer';
import VideoPlayer from "./components/VideoPlayer"
import { fetchData, fetchToken } from './components/functions';
import { useDispatch} from "react-redux"
import { useNavigate } from 'react-router';
import { addQueue } from './store/actions';
import Controller from './components/Controller';
import { Link } from 'react-router-dom';




function App() {
  const navigation = useNavigate()
  const dispatch = useDispatch()

  const queryParams = new URLSearchParams(window.location.search);
  const tokenValue = queryParams.get('token');
  useEffect(() => {
    console.log("useEffect")
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
      <Link to="/" style={{textDecoration:"none"}}>
      <h1 className="App-title">Youtube<span>Q</span></h1>
      </Link>
      <div className="main-container">
        <VideoPlayer />
        <QueueContainer />
      </div>
    </div>
  );
}

export default App;
