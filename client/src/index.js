import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from "react-modal";
import actionCable from 'actioncable'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './state/store';

// Allows to connect frontend with websockets.
const CableApp = {}

// Socket for Production
CableApp.cable = actionCable.createConsumer('wss://marketplace-ylzj.onrender.com/cable');

// Socket for Development
// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
Modal.setAppElement("#root");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App cable={CableApp.cable} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
