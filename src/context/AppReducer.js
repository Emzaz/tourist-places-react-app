export default function appReducer(state, action) {
  switch (action.type) {
    case "ADD_PLACE":
      return {
        ...state,
        places: [...state.places, action.payload],
      };

    case "UPDATE_PLACE":
      const updatedPlace = action.payload;

      const updatedPlaces = state.places.map((place) => {
        if (place.id === updatedPlace.id) {
          return updatedPlace;
        }
        return place;
      });

      return {
        ...state,
        places: updatedPlaces,
      };

    case "REMOVE_PLACE":
      return {
        ...state,
        places: state.places.filter(
          (place) => place.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
