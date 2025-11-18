import { SET_PLATFORM, SET_CATEGORY, SET_SORT } from "./filterTypes";

export const setPlatform = (platform) => ({
  type: SET_PLATFORM,
  payload: platform,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setSort = (sortBy) => ({
  type: SET_SORT,
  payload: sortBy,
});
