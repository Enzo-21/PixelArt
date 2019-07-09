var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change',
  (function () {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Cambia el indicador-de-color al colorActual
    $(indicadorDeColor).css('background-color', colorActual);

  })
);


let paleta = document.getElementById('paleta');
let grillaPixeles = document.getElementById('grilla-pixeles');
let indicadorDeColor = document.getElementById('indicador-de-color');


//Recorre los colores y crea un <div> hijo dentro de la paleta
recorrerColores = () => {
  for (const color of nombreColores) {
    let elemento = document.createElement('div');
    elemento.style.backgroundColor = color;
    elemento.className = 'color-paleta'

    paleta.appendChild(elemento);
  }
}
recorrerColores();

//Crea 1750 píxeles en la grilla
crearPixeles = () => {
  for (let i = 0; i < 1750; i++) {
    let elemento = document.createElement('div');
    grillaPixeles.appendChild(elemento);
  }
}
crearPixeles();

//Muestra en el indicador el color seleccionado por el usuario
$(paleta).find('div').click(function () {
  indicadorDeColor.style.backgroundColor = $(this).css('background-color');
});

//Pintar colores en la grilla con click
$(grillaPixeles).find('div').click(function () {
  $(this).css('background-color', $(indicadorDeColor).css('background-color'));
})


//Pintar con el mouse presionado 
let mousePresionado;
let estadoDelMouse = document.getElementById('estado-del-mouse');

$(grillaPixeles).mousedown(function () {
  mousePresionado = true;
  detectarMouse();
});
$(document).mouseup(function () {
  mousePresionado = false;
  detectarMouse();
});

pintar = () => {
  $(grillaPixeles).find('div').mouseover(function () {
    if (mousePresionado) {
      $(this).css('background-color', $(indicadorDeColor).css('background-color'));
    }
  })
}
pintar();

//Me dice el estado del mouse en el HTML

detectarMouse = () => {
  if (mousePresionado) {
    estadoDelMouse.textContent = 'Mouse Presionado';
    estadoDelMouse.style.color = 'white';

  } else if (!mousePresionado) {
    estadoDelMouse.textContent = 'Mouse Sin Presionar';
    estadoDelMouse.style.color = 'white';
  }
}

//Borrar todos los píxeles de la grilla
borrarGrilla = () => $(grillaPixeles).find('div').animate({backgroundColor: 'white'}, 1500);
$('#borrar').click(()=>{borrarGrilla()});

//Cargar superhéroes en la grilla
$('#batman').click(()=>{cargarSuperheroe(batman)});
$('#wonder').click(()=>{cargarSuperheroe(wonder)});
$('#flash').click(()=>{cargarSuperheroe(flash)});
$('#invisible').click(()=>{cargarSuperheroe(invisible)});

//Guardar
$('#guardar').click(()=>{
  $('#guardarPopup').css({display: 'block'});
  $('body').find("*:not(#guardarPopup, #afirmativo, #negativo, #guardarPopup p)").addClass('overlay');
});

  $('#negativo').click(()=>{
    $('#guardarPopup').css({display: 'none'});
    $('body').find("*:not(#guardarPopup)").removeClass('overlay');
  });

  $('#afirmativo').click(()=>{
    $('#guardarPopup').css({display: 'none'});
    $('body').find("*:not(#guardarPopup)").removeClass('overlay');
    guardarPixelArt();
  });