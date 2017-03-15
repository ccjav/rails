var Board = function( selector ) {
  // Aqui denerá ir el código que tenga que ver con tu tablero 
 
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  var $elem = $( selector );
  
  function initialize() {
    // Que debe de pasar cuando se crea un nuevo tablero?
    $( $elem ).dblclick(function(e) {
      if (e.target == $elem[0]) {
        var newPostIt = new PostIt(); 
        newPostIt.createPostIt($elem[0]);
        newPostIt.makeDraggable($elem[0]);
        newPostIt.closePostIt($elem[0]);
      }
    });    
  };
  initialize();
};

var PostIt = function() {
  // Aquí va el código relacionado con un post-it
  this.htmlCode = "<div id=\"master\" class=\"post-it\"><div class=\"header\"><div class=\"close\">X</div></div><div class=\"content\" contenteditable=\"true\">...</div></div>";
};

PostIt.prototype.createPostIt = function(boardSelector) {
  $( this.htmlCode ).appendTo(boardSelector).css({"left" : event.pageX, "top" : event.pageY});
}

PostIt.prototype.makeDraggable = function(boardSelector) {
  $("#" + boardSelector.id + " > div").draggable({ 
    handle: ".header",
    start: function( event, ui ) { 
      ui.helper.css("z-index", "1");
      ui.helper.siblings().css("z-index", "0");
    }
  });
}

PostIt.prototype.closePostIt = function(boardSelector) {
  $( ".close" ).click(function() {
    $(this).parentsUntil("#" + boardSelector.id).remove();
  });
}

$( document ).ready(function() {  
  $(function() {
    // Esta es la fucnión que correrá cuando este listo el DOM 
    var board = new Board('#board');
  });
});