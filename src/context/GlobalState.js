import React, { createContext, useReducer } from 'react';
import appReducer from './AppReducer';
import data from './../data/data.json';

const initialState = {
  places: data
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addPlace(place) {
    dispatch({
      type: "ADD_PLACE",
      payload: place
    });
  }

  function updatePlace(place) {
    dispatch({
      type: "UPDATE_PLACE",
      payload: place
    });
  }

  function removePlace(id) {
    dispatch({
      type: "REMOVE_PLACE",
      payload: id
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        places: state.places,
        addPlace,
        updatePlace,
        removePlace
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
