import {
  FETCH_PLACES,
  ADD_PLACE,
  UPDATE_PLACE,
  REMOVE_PLACE,
} from "../actions/types";

export default function placesReducer(places = [], action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PLACES:
      return places;

    case ADD_PLACE:
      return [...places, payload];

    case UPDATE_PLACE:
      const updatedPlace = payload;

      return places.map((place) => {
        if (place.id === updatedPlace.id) {
          return updatedPlace;
        }
        return place;
      });

    case REMOVE_PLACE:
      return places.filter((place) => place.id !== payload);

    default:
      return places;
  }
}
