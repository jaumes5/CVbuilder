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
    }
  });
});