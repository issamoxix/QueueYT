import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store"
import Add from './Add';
import YouTube from 'react-youtube';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <div><YouTube videoId={"TUVcZfQe-Kw"} /></div>,
  }, {
    path: "/player",
    element: <App />
  }, 
  {
    path:"/add",
    element: <Add />
  }
]);
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
