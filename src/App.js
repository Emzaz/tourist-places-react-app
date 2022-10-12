import React from 'react';
import './App.css';
import TouristPlaces from './components/TouristPlaces';
import {
  Route,
  Switch
} from "react-router-dom";

import AddTouristPlace from './components/AddTouristPlace';
import UpdateTouristPlace from './components/UpdateTouristPlace';
import DeletePlace from './components/DeletePlace';
import { Provider } from 'react-redux';
import store from './store'

function App() {

  return (

    <Provider store={store}>
      <div className='App'>
        <Switch>
          <Route path='/' component={TouristPlaces} exact />
          <Route path='/add' component={AddTouristPlace} exact />
          <Route path='/update/:id' component={UpdateTouristPlace} exact />
          <Route path='/delete/:id' component={DeletePlace} exact />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
