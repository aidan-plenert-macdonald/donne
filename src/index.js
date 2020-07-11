import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/">
      <div>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Navbar.Brand>Donne with Finnish</Navbar.Brand>
            <Nav.Link href={`${process.env.PUBLIC_URL}#/`}>Verbs</Nav.Link>
            <Nav.Link href={`${process.env.PUBLIC_URL}#/nouns`}>Nouns</Nav.Link>
          </Nav>
        </Navbar>
        <Route exact path="/">
          <App schema="verbs.schema.json" list="verbs.json" />
        </Route>
        <Route exact path="/nouns">
          <App schema="nouns.schema.json" list="nouns.json" />
        </Route>
      </div>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
