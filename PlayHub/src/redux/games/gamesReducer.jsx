import { FETCH_GAMES_FAILURE, FETCH_GAMES_REQUEST, FETCH_GAMES_SUCCESS } from "./gamesTypes";

const initialState = {
  loading: false,
  games: [],
  error: "",
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAMES_REQUEST:
      return { ...state, loading: true };

    case FETCH_GAMES_SUCCESS:
      return { loading: false, games: action.payload, error: "" };

    case FETCH_GAMES_FAILURE:
      return { loading: false, games: [], error: action.payload };

    default:
      return state;
  }
};

export default gamesReducer;
