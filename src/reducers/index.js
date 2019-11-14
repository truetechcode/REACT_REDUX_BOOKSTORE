import { combineReducers } from "redux";
import books from "./book";
import filter from "./filter";
import remove from "./remove";

export default combineReducers({
  books,
  filter,
  remove
});
