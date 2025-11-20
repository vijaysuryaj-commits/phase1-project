import * as types from "./gamesTypes";

const initialState = {
  popular: [],
  games: [],
  filteredGames: [],
  loading: false,
  error: null,
  searchResults: [],
  searchQuery: "",
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_GAMES_REQUEST:
    case types.FETCH_POPULAR_GAMES_REQUEST:
    case types.FETCH_FILTERED_GAMES_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_GAMES_SUCCESS:
      return { ...state, games: action.payload, filteredGames: action.payload, loading: false };

    case types.FETCH_POPULAR_GAMES_SUCCESS:
      return { ...state, popular: action.payload, loading: false };

    case types.FETCH_FILTERED_GAMES_SUCCESS:
      return { ...state, filteredGames: action.payload, loading: false };

    case types.FETCH_GAMES_FAILURE:
    case types.FETCH_POPULAR_GAMES_FAILURE:
    case types.FETCH_FILTERED_GAMES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload, loading: false };

    case types.CLEAR_SEARCH_RESULTS:
      return { ...state, searchResults: [] };

    case types.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case types.CLEAR_SEARCH_QUERY:
      return { ...state, searchQuery: "" };

    default:
      return state;
  }
}
