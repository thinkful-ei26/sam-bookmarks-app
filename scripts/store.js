'use strict';

const store = (function() {

  const addBookmark = function(page) {
    this.bookmarks.push(page);
  };


  return {
    bookmarks:[],
    addingBM: false,
    minRating: 4,
    error: null,


    addBookmark,
  };
}());