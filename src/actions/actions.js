import { FETCH_PLACES, ADD_PLACE, UPDATE_PLACE, REMOVE_PLACE } from "./types";

export const fetchPlaces = () => (dispatch) => {
  dispatch({
    type: FETCH_PLACES,
    payload: [],
  });
};

export const addPlace = (place) => (dispatch) => {
  dispatch({
    type: ADD_PLACE,
    payload: place,
  });
};

export const updatePlace = (place) => (dispatch) => {
  dispatch({
    type: UPDATE_PLACE,
    payload: place,
  });
};

export const removePlace = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_PLACE,
    payload: id,
  });
};
