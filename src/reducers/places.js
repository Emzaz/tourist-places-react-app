import { FETCH_PLACES, ADD_PLACE, UPDATE_PLACE, REMOVE_PLACE } from "../actions/types";

export default function placesReducer(places = [], action) {
    switch (action.type) {
      case FETCH_PLACES:
        return places;

      case ADD_PLACE:
        return [...places, action.payload]
  
      case UPDATE_PLACE:
        const updatedPlace = action.payload;
  
        return places.map((place) => {
          if (place.id === updatedPlace.id) {
            return updatedPlace;
          }
          return place;
        });
  
      case REMOVE_PLACE:
        return places.filter((place) => place.id !== action.payload)
  
      default:
        return places;
    }
  };
  