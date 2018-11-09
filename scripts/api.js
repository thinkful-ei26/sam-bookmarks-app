'use strict';
const api =(function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sam';

  const getServerItems = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback);
  };

  const createItem = function(name, onSuccess, onError) {
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: name,
      success: onSuccess,
      error: onError,
    });
  };
  const deleteItem = function(id, onSuccess, onError) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'DELETE',
      success: onSuccess,
      error: onError,
    });
  };


  return {
    getServerItems,
    createItem,
    deleteItem,

  };


}());