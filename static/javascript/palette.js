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
         "primary": "#FF0000",
         "secondary": "#FF7F7F",
         "tertiary": "#FFBFBF",
         "quaternary": "#B20000",
         "quinary": "#660000",
         "senary": "#330000"
     },
     "green": {
         "background": "#FFFFFF",
         "primary": "#008000",
         "secondary": "#66CC66",
         "tertiary": "#99FF99",
         "quaternary": "#004D00",
         "quinary": "#002600",
         "senary": "#001300"
     },
     "blue": {
         "background": "#FFFFFF",
         "primary": "#0000FF",
         "secondary": "#7F7FFF",
         "tertiary": "#BFBFFF",
         "quaternary": "#0000B2",
         "quinary": "#000066",
         "senary": "#000033"
     }
};

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
    const color = button.getAttribute('data-color');
    if (color == "random"){
        document.body.style.backgroundColor = getRanHex(6);
    }
    else{
        document.body.style.backgroundColor = color_picker[color]["background"];
    }
    const palette = ["primary", "secondary", "tertiary", "quaternary", "quinary", "senary"];
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
