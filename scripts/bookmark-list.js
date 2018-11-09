'use strict';
/* global store, api, $ */

const bookmarkList = (function(){

  function makeSingleBookmark (item) {
      
    return `
      <div class="simple_view">
            <button class="js_title_expand">
            <span class="title_button">${item.title}</span>
            </button>
            <span class="rating">Rating: ${item.rating}</span>
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
    <form id="js_create_bookmark">
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
         <span>Select Minimum Rating</span>
         <div class="dropdown-content">
           <button class="js_one_star star_button"> 
                <span class="rating_button">1 Star</span>
            </button>
            <button class="js_two_star star_button"> 
                <span class="rating_button">2 Star</span>
            </button>
            <button class="js_three_star star_button"> 
                <span class="rating_button">3 Star</span>
            </button>
            <button class="js_four_star star_button"> 
                <span class="rating_button">4 Star</span>
            </button>
            <button class="js_five_star star_button"> 
                <span class="rating_button">5 Star</span>
            </button>
            <button class="js_any_star star_button"> 
                <span class="rating_button">None</span>
            </button>
         </div>
     </div>
    </div>`;
    let bookmarks = [ ...store.bookmarks ];

    if (store.rating === 5) {
      bookmarks = store.bookmarks.Rating.filter(num => num>=5);
    }
    if (store.rating === 4) {
      bookmarks = store.bookmarks.Rating.filter(num => num>=4);
    }
    if (store.rating === 3) {
      bookmarks = store.bookmarks.Rating.filter(num => num>=3);
    }
    if (store.rating === 2) {
      bookmarks = store.bookmarks.Rating.filter(num => num>=2);
    }
    if (store.rating === 1) {
      bookmarks = store.bookmarks.Rating.filter(num => num>=1);
    }
    

    if (store.addingBM === true ){
      $('.js_adding_BM_toggled').html(addBMisTrue);
    } else {
      $('.js_adding_BM_toggled').html(addBMisFalse); 
    }

    
    const bookmarkListString = makeBookmarksString(bookmarks);
    $('.js_bookmark_list').html(bookmarkListString);
  }
   
  function handleAddBookmarkClicked () {
    $('.js_adding_BM_toggled').on('click', '.js_add_bookmark',function (event) {
      event.preventDefault();
      console.log('bookmark clicked');
      store.addingBM = !store.addingBM;
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
    $('.js_adding_BM_toggled').on('submit', '#js_create_bookmark', function (e) {
      e.preventDefault();
      console.log('i made it here!!');
      store.addingBM = !store.addingBM;
      const res = $(e.target).serializeJson();
      console.log(res);
      api.createItem(res, bookmarkSucess, bookmarkError);
    });
  }

  function bookmarkError() {
    console.log('!sucess');

  }
  function bookmarkSucess() {
    console.log('sucess');
  }

  function handleExpandButton() {

  }

  function handleMinRating() {

  }
  

  function bindEventListeners() {
    handleAddBookmarkClicked(); 
    handleCreateBookmark();
    handleExpandButton();
    handleMinRating();
  }


  return {
    render,
    bindEventListeners,
  };

}());