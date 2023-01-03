const languageBars = $('.language-chart');

const data = [
  {
    x: ['Java', 'Python', 'JavaScript'],
    y: [90, 80, 70],
    type: 'bar',
    hoverinfo: 'none',
    hoverlabel: {
      bgcolor: '#eee'
    }
  }
];

// Set the layout for the plot
const layout = {
  xaxis: {
    title: 'Language'
  },
  yaxis: {
    title: 'Level of proficiency (%)'
  }
};

// Create the bar chart using the Plotly.plot function
Plotly.plot('language-chart', data, layout);