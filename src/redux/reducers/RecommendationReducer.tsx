import types from "../types/recommendationTypes";
const recommendationReducer = (
  state = {
    books: [],
    videos: [],
    videosPageNumber: 1,
    booksPageNumber: 1,
  },
  action: any
) => {
  switch (action.type) {
    case types?.SAVED_LOADED_RECOMMENDATION: {
      return {
        ...state,
        books: action.payload.books,
        videos: action.payload.videos,
        videosPageNumber: action.payload.videosPageNumber || 1,
        booksPageNumber: action.payload.booksPageNumber || 1,
      };
    }

    default: {
      return state;
    }
  }
};
export default recommendationReducer;
