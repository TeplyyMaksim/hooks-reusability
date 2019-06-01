import { useReducer } from 'react';

const ACTION_TYPES = {
  SET_LAT: 'SET_LAT',
  SET_ERROR: 'SET_ERROR', 
}

const initialState = {
  lat: null,
  errorMessage: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT: {
      console.log('reducer triggered?');
      return {
        lat: action.lat,
        errorMessage: '',
      }
    }
    case ACTION_TYPES.SET_ERROR: {
      return {
        lat: null,
        errorMessage: action.message,
      }
    }
    default: {
      return state;
    }
  }
}

const useLocation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  window.navigator.geolocation.getCurrentPosition(
    position => {
      dispatch({
        lat: position.coords.latitude,
        type: ACTION_TYPES.SET_LAT,
      });
    },
    err => dispatch({
      errorMessage: err.message,
      type: ACTION_TYPES.SET_ERROR,
    })
  );

  return state;
};

export default useLocation;