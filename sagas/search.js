import axios from "axios";
import { put, call } from "redux-saga/effects";
import { takeLatest } from "redux-saga";
import {
  SEARCH_PERFORMED,
  searchSuccess,
  searchError
} from "../actions/search";

const apiKey = "H3srPSKXNkZjjK0yFLhwrHT4xQdg9Bwe";

function* doSearch({ searchTerm }) {
  try {
    const searchResults = yield call(
      axios.get,
      "https://api.giphy.com/v1/gifs/search",
      {
        params: { apiKey, q: searchTerm, limit: 25 }
      }
    );
    yield put(searchSuccess(searchResults.data.data));
  } catch (e) {
    yield put(searchError());
  }
}

export default function*() {
  yield takeLatest(SEARCH_PERFORMED, doSearch);
}
