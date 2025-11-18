import axios from "axios";
import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_FAILURE,
} from "./gamesActionTypes";

export const fetchGames = () => {
  return async (dispatch, getState) => {
    const { platform, category, sortBy } = getState().filters;

    dispatch({ type: FETCH_GAMES_REQUEST });

    try {
      let url = "https://www.freetogame.com/api/games";

      const params = {};
      if (platform) params.platform = platform;
      if (category) params.category = category;
      if (sortBy) params["sort-by"] = sortBy;

      const response = await axios.get(url, { params });

      dispatch({
        type: FETCH_GAMES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GAMES_FAILURE,
        payload: error.message,
      });
    }
  };
};
