'use strict';

const store = (function() {

  const addBookmark = function(page) {
    this.bookmarks.push(page);
  };


  return {
    bookmarks:[],
    addingBM: true,
    minRating: null,
    error: null,


    addBookmark,
  };
}());