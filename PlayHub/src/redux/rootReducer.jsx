import { combineReducers } from "redux";
import gameReducer from "./games/gameReducer";
import filterReducer from "./filters/filterReducer";

export default combineReducers({
  gamesState: gameReducer,
  filtersState: filterReducer,
});
