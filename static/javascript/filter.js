// Get the input text field and the list of experiences
const filterInput = $('#experience-filter');
const experienceList = $('#experience-list');

// Add an event listener for the input event
filterInput.on('input', () => {
  // Get the filter text
  const filterText = filterInput.val().toLowerCase();
  // Send an AJAX request to the server
  $.ajax({
    url: '/filter',
    type: 'POST',
    data: { filter: filterText },
    success: (experiences) => {
      experienceList.empty();
      for (const experience of experiences) {
        experienceList.append(experience);
      }
      if (lastPressedButton) {
        lastPressedButton.click();
      }
    }
  });
});

function addToFilter(tech) {
    // Get the current filter
    var filter = filterInput.val();

    // Add the technology to the filter
    if (filter) {
        filter += ',' + tech;
    } else {
        filter = tech;
    }

    filterInput.val(filter);
    // Trigger the input event
    filterInput.trigger('input');
}