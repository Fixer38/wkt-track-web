import React from 'react';
import './App.css';
import Signup from "./components/signup";
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Signup} path="/signup" />
          <Route exact component={Login} path="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
