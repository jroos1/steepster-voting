$('document').ready(function() {

  //Not using responsive design on all pages, sorry...
  $('.right-nav').click(function() {
    $('.nav-mobile').slideToggle();
  });

  $( window ).resize(function() {
    if($( window ).width() >= 1024) {
        $('.nav-mobile').hide();
    }
  });


  $('.vote-button').click(function() {
    //Variable that selects the ID of the clicked button
    var teaId = $(this).data('tea');
    //Variable  that selects sibling div of clicked button to select HTML
    var voteParent = $(this).siblings('.tea-info');
    //Variable that selects specific children content of div to be displayed in aside
    var teaContent = voteParent.children();
    //Variable for HTML clone of content of siblinng of clicked button in aside
    var clone = $(teaContent).clone();
    
    //Situation where tea has already been voted on
    if($(this).hasClass('voted')) {
      $(this).toggleClass('vote voted').text('Vote for Tea Name');
    //If tea hasn't already been voted on, toggle vote/voted class and create li with corresponding teaID and html clone
    } else {
      $(this).toggleClass('vote voted').text('Voted!');
      var li = $('<li />', {'data-tea': teaId, class: 'voted-on-tea'}).html(clone);
      
      //Variable that identifies the html to be added to the newly created li
      var removeLink = $('<a />', {href: '#', class: 'remove-tea', text: 'x'});
      //Remove li event handler
      removeLink.click(function(event) {
        event.preventDefault();
        //Removes parent li from ol in aside
        $(this).parent().remove();
        //Variable selects button in main corresponding to the selected teaID
        var voteButton = $('main .voted[data-tea="' + teaId + '"]');
        //Updated class of correspond button in main when removeLink is run
        voteButton.removeClass('voted').addClass('vote').text('Vote for Tea Name');
        //Runs function noted below
        updateInputValuesBasedOnPosition();
      });
      //Adds removeLink variable to the li
      li.append(removeLink);

      //Creates input to allow user to submit new ranking values and reorder list
      //Variable identifies total length of items in .myvotes ol
      var numberOfTeasInMyVotes = $('.myvotes li').length + 1;
      //Variable to create the input for the li to add it to the last position of the ol
      var orderInput = $('<input />', {type: 'number', value: numberOfTeasInMyVotes});
      li.prepend(orderInput);
      li.appendTo('.myvotes');
    }
  });

  //Event handler for submitting new ranking through inputs
  $('#vote-form').submit(function(event) {
    event.preventDefault();
    updatePositionBasedOnRankInput();
  });


  //Function to update rankings based on input values from user
  function updatePositionBasedOnRankInput() {
    var voteValue, item;
    var totalItems = $('.myvotes li').length;
    
    //Gets index value for each input item in the ol
    $('.myvotes li input').each(function(index) {
      //Select the parent (li) of the input
      item = $(this).parent();
      //Establishes variable for the input value
      voteValue = $(this).val();
  
      //Catches for user edge case scenarions - makes sure the input isn't too high or low.
      //If user tries to put in a rank less than 1, keeps li in same index position
      if(voteValue < 1) {
        voteValue = index + 1;
      //If user enters rank higher than  total number of items, makes  voteValue equal to the number of items in list - moves it to the end
      } else if(voteValue > totalItems) {
        voteValue = totalItems;
      }

      // Moves the li based on the value in the input in cases where there is a tie
      //If input value is higher than current rank, adds it after the li that has that same index rank
      if(voteValue > (index + 1)) {
        item.insertAfter('.myvotes li:nth(' + (voteValue - 1) + ')');
      //If input value is lower than current rank, adds it before the li that has that same index rank
      } else {
        item.insertBefore('.myvotes li:nth(' + (voteValue - 1) + ')');
      }
    });

    //Runs function as outlined below
    updateInputValuesBasedOnPosition();
  }

  
  //Update the values of the  inputs now that item positions have updated
  function updateInputValuesBasedOnPosition() {
    $('.myvotes li input').each(function(index) {
      $(this).val(index + 1);
    });
  }

});
