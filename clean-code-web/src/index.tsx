import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Container} from 'reactstrap';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Container><App /></Container>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
