var Board = function( selector ) {
  // Aqui denerá ir el código que tenga que ver con tu tablero 
 
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  var $elem = $( selector );
  
  function initialize() {
    // Que debe de pasar cuando se crea un nuevo tablero?
    $( $elem ).dblclick(function(e) {
      if (e.target == $elem[0]) {
        new PostIt(selector); 
      }
    });
  };

  initialize();
};

var PostIt = function(selector) {
  // Aquí va el código relacionado con un post-it
  var postIt = "<div id=\"master\" class=\"post-it\"><div class=\"header\"><div class=\"close\">X</div></div><div class=\"content\" contenteditable=\"true\">...</div></div>";
  $( postIt ).appendTo(selector).css({"left" : event.pageX, "top" : event.pageY});
  $(selector + " > div").draggable({ 
    handle: ".header",
    start: function( event, ui ) { 
      ui.helper.css("z-index", "1");
      ui.helper.siblings().css("z-index", "0");
    }
  });

  $( ".close" ).click(function() {
    $(this).parentsUntil("#board").remove();
  });
};

$( document ).ready(function() {  
  $(function() {
    // Esta es la fucnión que correrá cuando este listo el DOM 
    new Board('#board');
  });
});