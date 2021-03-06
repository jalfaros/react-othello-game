import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardLogin } from './Components/login/CardLogin';
import CardRegister from './Components/register/CardRegister';

ReactDOM.render(
  <CardLogin />,
  document.getElementById('root')
);
