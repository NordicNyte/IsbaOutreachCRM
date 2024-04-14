import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Home  from './Home';
import Connect   from './Connect';
import { Inbox } from './Inbox';
import { Calendar } from './Calendar';
import Forms from './Forms';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePickerPage from './Calendar';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;


    // <div className="App">
    //   <header className="App-header">
    //             <img src={logo} className="App-logo" alt="logo" />
    //     <Button> Test Button </Button>
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>