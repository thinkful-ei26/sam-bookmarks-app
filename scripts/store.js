'use strict';

const store = (function() {

  const addBookmark = function(page) {
    Object.assign(page, {expanded: false});
    this.bookmarks.push(page);
  };

  const serchAndDestroy = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const setError = function(error) {
    this.error = error;
  };



  return {
    bookmarks:[],
    addingBM: false,
    minRating: null,
    error: null,


    addBookmark,
    serchAndDestroy,
    findById,
    findAndUpdate,
    setError,
  };
}());