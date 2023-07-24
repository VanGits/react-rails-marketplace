import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from "react-modal";
import actionCable from 'actioncable'
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";

// Allows to connect frontend with websockets.
const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
Modal.setAppElement("#root");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App cable={CableApp.cable}/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
