import { SET_SELECTED_GENRE, SET_PLATFORM, SET_SORT_BY } from "./filterActions";

const initialState = {
  selectedGenre: "",
  platform: "",
  sortBy: "release-date",
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_GENRE:
      return { ...state, selectedGenre: action.payload };
    case SET_PLATFORM:
      return { ...state, platform: action.payload };
    case SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}
