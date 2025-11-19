import axios from "axios";
import * as types from "./gamesTypes";

const normalizePlatform = (p) => {
  if (!p || p === "all") return null;
  return p;
};

const normalizeSort = (sortBy, platform) => {
  if (!sortBy) return null;
  if ((sortBy === "popularity" || sortBy === "alphabetical") && !platform) {
    return null;
  }
  return sortBy;
};

export const fetchPopularGames = () => async (dispatch) => {
  dispatch({ type: types.FETCH_POPULAR_GAMES_REQUEST });
  try {
    const resp = await axios.get("/api/games?sort-by=popularity");
    dispatch({ type: types.FETCH_POPULAR_GAMES_SUCCESS, payload: resp.data.slice(0, 15) });
  } catch (err) {
    dispatch({ type: types.FETCH_POPULAR_GAMES_FAILURE, payload: err.message });
  }
};

export const fetchGames = (filters = {}) => async (dispatch) => {
  dispatch({ type: types.FETCH_GAMES_REQUEST });
  try {
    let url = "/api/games";
    const params = [];

    const platform = normalizePlatform(filters.platform);
    const sortBy = normalizeSort(filters.sortBy, platform);

    if (filters.selectedGenre) {
      params.push(`category=${encodeURIComponent(filters.selectedGenre.toLowerCase().replace(/\s+/g, "-"))}`);
    }
    if (platform) params.push(`platform=${platform}`);
    if (sortBy) params.push(`sort-by=${sortBy}`);

    if (params.length)
      url += `?${params.join("&")}`;

    const resp = await axios.get(url);
    dispatch({
      type: types.FETCH_GAMES_SUCCESS,
      payload: Array.isArray(resp.data) ? resp.data : []
    });
  } catch (err) {
    dispatch({
      type: types.FETCH_GAMES_FAILURE,
      payload: err.message || "Failed to fetch games"
    });
  }
};

export const doSearch = (query) => async (dispatch, getState) => {
  dispatch({ type: types.FETCH_GAMES_REQUEST });

  try {
    const allGames = getState().gamesState.games || [];
    const filtered = allGames.filter((g) =>
      g.title?.toLowerCase().includes(query.toLowerCase())
    );

    dispatch({ type: types.SET_SEARCH_RESULTS, payload: filtered });
  } catch (err) {
    dispatch({ type: types.FETCH_GAMES_FAILURE, payload: err.message || "Search failed" });
  }
};

export const clearSearchResults = () => ({ type: types.CLEAR_SEARCH_RESULTS });
export const setSearchQuery = (query) => ({
  type: types.SET_SEARCH_QUERY,
  payload: query
});
export const clearSearchQuery = () => ({ type: types.CLEAR_SEARCH_QUERY });
