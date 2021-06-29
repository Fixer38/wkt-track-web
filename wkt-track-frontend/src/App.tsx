import React from 'react';
import './App.css';
import Signup from "./components/signup";
import {BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact component={Signup} path="/signup" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
