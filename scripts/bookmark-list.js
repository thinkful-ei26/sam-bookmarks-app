'use strict';
/* global store, api, $ */

const bookmarkList = (function(){

  function makeSingleBookmark (item) {
      
    return `
      <div class="simple_view">
            <button class="js_title_expand">
            <span class="title_button">${item.title}</span>
            </button>
            <span class="rating">${item.rating}</span>
    </div>`;
  }


  function makeBookmarksString(bookmarkList) {
    const items = bookmarkList.map((bookmark) => makeSingleBookmark(bookmark));
    return items.join('');
  }

  function render() {
    console.log('render ran');
    
    const addBMisTrue = 
    `<div class="js_add_bookmark_view">
    <form id="js_add_bookmark">
        <div class="create_bookmark">
            <button class="js_create_bookmark"> 
                <span class="button">Create Bookmark</span>
            </button>
            <label for="bM_title">Title:</label>    
            <input type="text" name="title" id="bM_title" />
            <label for="bM_url">URL:</label>    
            <input type="text" name="url" id="bM_url" />
            <label for="bM_descrition">Descrition:</label>    
            <input type="text" name="descrition" id="bM_descrition" />
            <label for="bM_rating">Rating:</label>    
            <input type="text" name="rating" id="bM_rating" />       
        </div>
    </form>
    </div>`;

    const addBMisFalse = 
    `  <div class="add_and_minRating">
    <button class="add-bookmark js_add_bookmark">
        <span class="button">Add Bookmark</span>
    </button>
    <div class="dropdown">
         <span>Select Rating</span>
         <div class="dropdown-content">
           <p>1 Star</p>
           <p>2 Star</p>
           <p>3 Star</p>
           <p>4 Star</p>
           <p>5 Star</p>
         </div>
     </div>
    </div>`;


    if (store.addingBM === true ){
      $('.js_adding_BM_toggled').html(addBMisTrue);
    } else {
      $('.js_adding_BM_toggled').html(addBMisFalse); 
    }

    
    const bookmarkListString = makeBookmarksString(store.bookmarks);
    $('.js_bookmark_list').html(bookmarkListString);
  }
   
  function handleAddBookmarkClicked () {
    $('.js_adding_BM_toggled').on('click', '.js_add_bookmark',function (event) {
      event.preventDefault();
      console.log('bookmark clicked');
      store.addingBM === !store.addingBM;
      console.log(store.addingBM);
      render();
    });
  }

  $.fn.extend({
    serializeJson: function() {
      const obj = {};
      const data = new FormData(this[0]);
      data.forEach((value, key) => {
        obj[key] = value;
      });
      return JSON.stringify(obj);
    }
  });
  
  function handleCreateBookmark() {
    $('.js_add_bookmark').on('submit', e => {
      e.preventDefault();
      const res = $(e.target).serialieJSON();
      console.log(res);
    });
  }
  

  function bindEventListeners() {
    handleAddBookmarkClicked(); 
    handleCreateBookmark();
  }


  return {
    render,
    bindEventListeners,
  };

}());