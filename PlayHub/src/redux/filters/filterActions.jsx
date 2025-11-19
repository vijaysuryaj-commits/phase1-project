import {SET_PLATFORM ,SET_SELECTED_GENRE, SET_SORT_BY} from './filterReducer'

export const setSelectedGenre = (genre="") => ({ type: SET_SELECTED_GENRE, payload: genre });
export const setPlatform = (platform) => ({ type: SET_PLATFORM, payload: platform });
export const setSortBy = (sortBy) => ({ type: SET_SORT_BY, payload: sortBy });
