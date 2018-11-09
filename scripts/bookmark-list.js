'use strict';
/* global store, api, $ */

const bookmarkList = (function(){

  function makeSingleBookmark (item) {

    if (store.minRating > item.rating) { 
        
      return '';
    }

    if (item.expanded === false){
      return `
        <div class="view" data-item-id="${item.id}">
              <button class="js_title_expand">
              <a> ${item.title} </a>
              </button>
              <span class="rating">Rating: ${item.rating}</span>
      </div>`;
    }
    if (item.expanded === true) {
    
      return `
        <div class="view" data-item-id="${item.id}">
    <button class="js_title_shrink">
        <a class="title_button">${item.title}</a>
    </button>
    <span class="description">Descripton: ${item.desc}</span>
    <span class="rating">Rating: ${item.rating}</span>
    <button class="js_visitSite"> 
    <a href="${item.url}" class="button" target="_blank">Go to Site</a>
    </button>
    <button class="js_delete_bookmark"> 
       Delete 
    </button>
    </div>`;  
    }
  }
   

  function makeBookmarksString(bookmarkList) {
    //could move rating logic here with .filter
    const items = bookmarkList.map((bookmark) => makeSingleBookmark(bookmark));
    return items.join('');
  }


  function generateError(err) {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <section class="error_content">
        <button id="cancel_error">X</button>
        <p>${message}</p>
      </section>
    `;
  }


  function render() {

    if (store.error) {
      const el = generateError(store.error);
      $('.error_container').html(el);
    } else {
      $('.error_container').empty();
    }

    console.log(store.addingBM);
    
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
            <input type="text" name="desc" id="bM_descrition" />
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
                1 Star
            </button>
            <button class="js_two_star star_button"> 
                2 Star
            </button>
            <button class="js_three_star star_button"> 
                3 Star
            </button>
            <button class="js_four_star star_button"> 
                4 Star
            </button>
            <button class="js_five_star star_button"> 
                5 Star
            </button>
         </div>
     </div>
    </div>`;

    
    

    if (store.addingBM === true ){
      $('.js_adding_BM_toggled').html(addBMisTrue);
    } else {
      $('.js_adding_BM_toggled').html(addBMisFalse); 
    }
    
    
    let bookmarks = [ ...store.bookmarks ];

         
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
      api.createItem(res, bookmarkSucess, 
        (err) => {
          console.log(err);
          store.setError(err);
          render();
        });
      
    });
    render();
    
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.view')
      .data('item-id');
  }

  function handleDeleteBookmark() {
    console.log('delete handelr getting setup');
    $('.js_bookmark_list').on('click', '.js_delete_bookmark', function (e) {
      e.preventDefault();
      console.log('deleted was pushed!');
      const id = getItemIdFromElement(e.currentTarget);
      console.log(id);
      api.deleteItem(id, 
        () => {
          store.serchAndDestroy(id);
          console.log('find and delete ran');
          render();
        },
        (err) => {
          console.log(err);
          store.setError(err);
          render();
        }
      );
    });
  }

 
  function bookmarkSucess() {
    render();
    console.log('sucess');
  }

  function handleExpandButton() {  
    $('.js_bookmark_list').on('click','.js_title_expand',  function(e) {
      e.preventDefault();
      const id = getItemIdFromElement(e.currentTarget);
      const item = store.findById(id);
      store.findAndUpdate(id, { expanded: !item.expanded });
      console.log('handle expand ran');
      render();
    });
  }

  function handleShrinkButton() {  
    $('.js_bookmark_list').on('click','.js_title_shrink',  function(e) {
      e.preventDefault();
      const id = getItemIdFromElement(e.currentTarget);
      const item = store.findById(id);
      store.findAndUpdate(id, { expanded: !item.expanded });
      console.log('handle shrink ran');
      render();
    });
  }


  function handleMinRating() {
    $('.js_adding_BM_toggled').on('click', '.js_one_star', () => {
      store.minRating = 1;
      console.log('minRating changed to 1');
      render();
    });
    $('.js_adding_BM_toggled').on('click', '.js_two_star', () => {
      store.minRating = 2;
      console.log('minRating changed to 2');
      render();
    });
    $('.js_adding_BM_toggled').on('click', '.js_three_star', () => {
      store.minRating = 3;
      console.log('minRating changed to 3');
      render();
    });
    $('.js_adding_BM_toggled').on('click', '.js_four_star', () => {
      store.minRating = 4;
      console.log('minRating changed to 4');
      render();
    });
    $('.js_adding_BM_toggled').on('click', '.js_five_star', () => {
      store.minRating = 5;
      console.log('minRating changed to 5');
      render();
    });
  }
  function handleCloseError() {
    $('.error_container').on('click', '#cancel_error', () => {
      store.setError(null);
      render();
    });
  }
  

  function bindEventListeners() {
    handleAddBookmarkClicked(); 
    handleCreateBookmark();
    handleExpandButton();
    handleMinRating();
    handleDeleteBookmark();
    handleShrinkButton();
    handleCloseError();
  }


  return {
    render,
    bindEventListeners,
  };

}());