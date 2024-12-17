import { toggleEasterEgg } from './easter.js';

const experienceList = $('#experience-list');
const selectedExperiences = $('#selected-experiences');

$(document).ready(function() {
  $('#extra-description').click(function() {
    var isExtendedDescription = $(this).hasClass('active');
    toggleEasterEgg();
    const updatedExperiences = selectedExperiences.children().map(function() {
      return $(this).contents().get(0).nodeValue.trim();
    }).get();
    $(this).toggleClass('active');
    $.ajax({
      type: 'POST',
      url: '/filter',
      contentType: 'application/json',
      data: JSON.stringify({
        filter: updatedExperiences,
        toggle_state: !isExtendedDescription
      }),
      success: function(response) {
        // Update the page content with the new description type
        experienceList.empty();

        response.forEach(function(experience) {
          experienceList.append(experience);
        });
      }
    });
  });
});