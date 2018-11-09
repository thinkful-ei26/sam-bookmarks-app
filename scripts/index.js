'use strict';
/* global bookmarkList, store */
$(document).ready(function() {
  bookmarkList.bindEventListeners();  
  bookmarkList.render();


  api.getServerItems((items) => {
    items.forEach((item) => store.addBookmark(item));
    bookmarkList.render();
  });


});