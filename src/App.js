import React, { Component } from 'react';
import Main from './routes/Main';
import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/antd.css';
import './sass/index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
