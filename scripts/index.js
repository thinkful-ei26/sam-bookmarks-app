'use strict';
/* global bookmarkList, store */
$(document).ready(function() {
  bookmarkList.bindEventListeners();  
  bookmarkList.render();


  api.getServerItems((items) => {
    // var result = items.map(function(el) {
    //   var o = Object.assign({}, el);
    //   o.expanded = false;
    //   return o;
    // });
    // //items.forEach((e) => Object.assign({},e).expanded = true);
    items.forEach((item) => store.addBookmark(item));
    bookmarkList.render();
  });

 

});