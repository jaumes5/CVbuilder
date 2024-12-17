import { toggleEasterEgg } from './easter.js';

const filterInput = $('#experience-filter');
const experienceList = $('#experience-list');
const selectedExperiences = $('#selected-experiences');
let timeoutId = null;

filterInput.on('keypress', function(e) {
  if (e.which === 13) {
    e.preventDefault();

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    $('.reminder-message').remove();

    const experience = filterInput.val().trim();
    if (experience) {
      const listItem = $('<li>').text(experience);
      const removeButton = $('<button>').html('&times;').addClass('remove-button').on('click', function() {
        listItem.remove();
        sendAjaxRequest();
      });
      listItem.append(removeButton);
      selectedExperiences.append(listItem);
      filterInput.val('');
      sendAjaxRequest();
    }
  }
});

filterInput.on('input', function() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  const currentValue = filterInput.val().trim();

  if (currentValue) {
    timeoutId = setTimeout(function() {
      const message = $('<div>').text('Don\'t forget to press Enter!').addClass('reminder-message').hide();

      message.css({
        position: 'absolute',
        top: filterInput.offset().top + filterInput.outerHeight(),
        left: filterInput.offset().left,
        backgroundColor: '#ff4b5c',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000
      });

      $('body').append(message);
      message.fadeIn(500);

      setTimeout(function() {
        message.fadeOut(500, function() {
          message.remove();
        });
      }, 4000);  // Remove the message after 4 seconds
    }, 5000);  // Append the message after 5 seconds
  }
});

function sendAjaxRequest() {
  // Get the updated list of experiences
  toggleEasterEgg()
  const updatedExperiences = selectedExperiences.children().map(function() {
    return $(this).contents().get(0).nodeValue.trim();
  }).get();

  // Send an AJAX request to the server
  $.ajax({
    url: '/filter',
    type: 'POST',
    contentType: 'application/json', // specify the content type
    data: JSON.stringify({
      filter: updatedExperiences,
      toggle_state: $('#extra-description').hasClass('active')
    }), // stringify the data
    success: function(response) {
      experienceList.empty();

      response.forEach(function(experience) {
        experienceList.append(experience);
      });
    }
  });
}

function addToFilter(tech) {
    const listItem = $('<li>').text(tech);
    const removeButton = $('<button>').html('&times;').addClass('remove-button').on('click', function() {
        listItem.remove();
        sendAjaxRequest();
    });


    listItem.append(removeButton);
    selectedExperiences.append(listItem);
    sendAjaxRequest();
}

window.addToFilter = addToFilter;