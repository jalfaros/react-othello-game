import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { OthelloGameApp } from './OthelloGameApp';


const options = {
  position: positions.BOTTOM_RIGHT, 
  offset: '30px',
}

ReactDOM.render(

  <AlertProvider template={AlertTemplate} {...options}>

    <OthelloGameApp />,

  </AlertProvider>,
  document.getElementById('root')
);