const form = document.querySelector('#color-form');
const color_picker = {
     "default": {
         "background": "#FFFFFF",
         "primary": "#333333",
         "secondary": "#c9c9c9",
         "tertiary": "#fcfcfc",
         "quaternary": "#555",
         "quinary": "#666",
         "senary": "#555",
         "contrast": "#333333"
     },
     "orange": {
         "background": "#FFFFFF",
         "primary": "#29292b",
         "secondary": "#fe9d01",
         "tertiary": "#ffb407",
         "quaternary": "#29292b",
         "quinary": "#464649",
         "senary": "#28282A",
         "contrast": "#fe9d01"
     },
     "green": {
         "background": "#FFFFFF",
         "primary": "#29343a",
         "secondary": "#01a64a",
         "tertiary": "#99FF99",
         "quaternary": "#222B30",
         "quinary": "#192024",
         "senary": "#001300",
         "contrast": "#01a64a"
     },
     "blue": {
         "background": "#FFFFFF",
         "primary": "#292321",
         "secondary": "#4ec8ff",
         "tertiary": "#85D8FF",
         "quaternary": "#221D1B",
         "quinary": "#000066",
         "senary": "#000033",
         "contrast": "#4ec8ff"
     }
};
let lastPressedButton = null;

const getRanHex = size => {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return "#" + result.join('');
}

form.addEventListener('click', (event) => {
  const button = event.target;
  if (button.tagName === 'BUTTON') {
    lastPressedButton = button;
    color = button.getAttribute('data-color');
    if (color == "random"){
        document.body.style.backgroundColor = getRanHex(6);
    }
    else{
        document.body.style.backgroundColor = color_picker[color]["background"];
    }
    const palette = ["primary", "secondary", "tertiary", "quaternary", "quinary", "senary", "contrast"];
    for(pal of palette){
      if (color == "random"){
        var style_color = getRanHex(6);
      }
      else{
        var style_color = color_picker[color][pal];
      }
      document.querySelectorAll("." + pal).forEach((element) => {
        if (element.classList.contains('background')) {
          element.style.backgroundColor = style_color;
          //element.before.style.borderLeftColor = color_picker[color][pal];
        }
        else{
          element.style.color = style_color;
        }
      });
    }
  }
});