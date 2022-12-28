// Get the form element
const form = document.querySelector('#color-form');
const color_picker = {
	"default": {
	    "background": "#FFFFFF",
	    "primary": "#333333",
	    "secondary": "#fcfcfc",
	    "tertiary": "#f4f4f4",
	    "quaternary": "#555",
	    "quinary": "#666",
	    "senary": "#555"
	},
  	"red": {
	    "background": "#FFFFFF",
	    "primary": "#F9564F",
	    "secondary": "#FDC6C4",
	    "tertiary": "#FEECEB",
	    "quaternary": "#F3C677",
	    "quinary": "#666",
	    "senary": "#555"
	},
	"green": {
	    "primary": "#297045",
	    "secondary": "#2E933C",
	    "tertiary": "#D183C9",
	},
	"blue": {
	    "primary": "#297045",
	    "secondary": "#2E933C",
	    "tertiary": "#D183C9",
	}
};
form.addEventListener('click', (event) => {
  const button = event.target;
  if (button.tagName === 'BUTTON') {
    const color = button.getAttribute('data-color');
    document.body.style.backgroundColor = color_picker[color]["background"];
    document.querySelectorAll('.color').forEach((element) => {
      element.style.color = color_picker[color]["primary"];
    });
    const palette = ["primary", "secondary", "tertiary", "quaternary", "quinary", "senary"];
    for(pal of palette){
        document.querySelectorAll("." + pal).forEach((element) => {
          if (element.classList.contains('background')) {
            element.style.backgroundColor = color_picker[color][pal];
          }
          else{
            element.style.color = color_picker[color][pal];
          }
        });
    }
  }
});
