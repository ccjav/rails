$( document ).ready(function() {  
  var allBoards = {};
  $(function() {
    $( "#newBoardForm" ).submit(function( event ) {
      var newBoardName = prompt("Nombre del board");
      allBoards[newBoardName] = new Board('#' + newBoardName);
      allBoards[newBoardName].createBoard();
      console.log("este es all boards ");
      console.log(allBoards);
      event.preventDefault();
    });
    // Esta es la fucnión que correrá cuando este listo el DOM
  });
});

var Board = function( selector ) {
  // Aqui denerá ir el código que tenga que ver con tu tablero 
  this.id = selector;
  this.htmlCode = '<div id=\"' + selector + '\"' + 
          ' style="background-color: #9e8d68; margin: 0; padding: 0; position: absolute; height: 100%; width: 90%; right: 0; top: 0;">'+
          '</div>';
  // $(elm).appendTo("body");
  // // $( "#menu" ).append("<p>" + boardName + "</p>");
  // // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // // De esta manera no dependerás tanto de tu HTML.  
  // var $elem = $( selector );
  // console.log("este es all boards 2 ");
  //     console.log(allBoards);
  // // $( "body" ).append("<div id=" + $elem.selector + "></div>")

  
};

Board.prototype.createBoard = function() {
  var $elem = this.id;
  $( 'body' ).on( "dblclick", $($elem), function(e) {
    // if (e.target.id == $elem) {
      var newPostIt = new PostIt(); 
      newPostIt.createPostIt($elem);
      newPostIt.makeDraggable($elem);
      newPostIt.closePostIt($elem);
      console.log("doble click");
    // }
  });
  // $( $elem ).dblclick(function(e) {
  //   // if (e.target == $elem[0]) {
  //   //   var newPostIt = new PostIt(); 
  //   //   newPostIt.createPostIt($elem[0]);
  //   //   newPostIt.makeDraggable($elem[0]);
  //   //   newPostIt.closePostIt($elem[0]);
  //   // }
  //   console.log("doble click");
  // });

  // $( this.htmlCode ).appendTo('body');

  $('body').append($('<div/>',{
    'id'    : 'child'
  }));
  // background-color: #9e8d68; margin: 0; padding: 0; position: absolute; height: 100%; width: 90%; right: 0; top: 0;
  $('#child').css({"background-color" : "#9e8d68", "position" : "absolute", "height" : "100%", "width" : "90%", "right" : 0, "top" : 0})
  console.log("en createBoard padre")
  // var $ele = $( 'body' ).find($elem);
  console.log($($elem));
}

var PostIt = function() {
  // Aquí va el código relacionado con un post-it
  this.htmlCode = "<div id=\"master\" class=\"post-it\"><div class=\"header\"><div class=\"close\">X</div></div><div class=\"content\" contenteditable=\"true\">...</div></div>";
};

PostIt.prototype.createPostIt = function(boardSelector) {
  // var $currentBoard = $('body').find(boardSelector);
  $( "<p>fsdaf</p>" ).appendTo( "#child" );
  // $( this.htmlCode ).appendTo( boardSelector ).css({"left" : event.pageX, "top" : event.pageY});
  // $(boardSelector).add("p")
  $( boardSelector ).html("<p>fsdaf</p>");

  // var btn = document.createElement("BUTTON");
  // document.body.appendChild(btn);
  console.log("en create post it");
  console.log(this.htmlCode);
  console.log(boardSelector);
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
