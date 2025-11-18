import { SET_CATEGORY, SET_PLATFORM, SET_SORT } from "./filterTypes";

const initialFilterState = {
  platform: "",
  category: "",
  sortBy: "",
};


const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case SET_PLATFORM:
      return { ...state, platform: action.payload };

    case SET_CATEGORY:
      return { ...state, category: action.payload };

    case SET_SORT:
      return { ...state, sortBy: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
