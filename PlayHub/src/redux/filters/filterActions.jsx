export const SET_SELECTED_GENRE = "SET_SELECTED_GENRE";
export const SET_PLATFORM = "SET_PLATFORM";
export const SET_SORT_BY = "SET_SORT_BY";

export const setSelectedGenre = (genre="") => ({ type: SET_SELECTED_GENRE, payload: genre });
export const setPlatform = (platform) => ({ type: SET_PLATFORM, payload: platform });
export const setSortBy = (sortBy) => ({ type: SET_SORT_BY, payload: sortBy });
