import { combineReducers } from "redux";
import gamesReducer from "./games/gamesReducer";
import filterReducer from "./filters/filterReducer";

const rootReducer = combineReducers({
  games: gamesReducer,
  filters: filterReducer,
});

export default rootReducer;
