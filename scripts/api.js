'use strict';
const api =(function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sam';

  const getServerItems = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback);
  };


  return {
    getServerItems,

  };


}());