import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from "react"
import PastOrders from "./components/PastOrders/PastOrders"
import Create from "./components/CreateOrder/Create.js"
import Register from "./components/Register/Register.js"
import Signin from "./components/Signin/Signin.js"
import PrivateRoute from './routes/PrivateRoute';

function App() {
  
  return (
    <Router>
      <div className="App">

        <Route exact path="/">
          <Signin />

        </Route>
        <Route exact path="/register">
          <Register />
        </Route>

        <PrivateRoute exact path="/create">
          <Create />
        </PrivateRoute>

        <PrivateRoute exact path="/orders">
          <PastOrders />
        </PrivateRoute>

      </div>
    </Router>
  );
}

export default App;
