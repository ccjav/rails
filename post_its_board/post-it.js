$( document ).ready(function() {
  var allBoards = {};
  $(function() {
    $( "#newBoard" ).on( "click", function( event ) {
      var newBoardName = prompt("Nombre del board:");
      allBoards[newBoardName] = new Board('#' + newBoardName);
      
      var keys = Object.keys(allBoards);
      
      allBoards[newBoardName].createBoard();
      $( '#boardsMenu' ).append( '<li id="lista" data-board=\"#' + newBoardName + '\"><a href=\"#\">' + newBoardName + '</a></li>' );
      $( '#boardsMenu li a' ).on( "click", function(e) {
        var otherBoardSelectors = getSiblings(this.parentNode);
        var arrayLength = otherBoardSelectors.length;
        for (var i = 0; i < arrayLength; i++) {
          document.getElementById(otherBoardSelectors[i].dataset.board).style.display = 'none';
          otherBoardSelectors[i].style.background = 'none';
        }
        document.getElementById(allBoards[this.innerHTML].id).style.display = 'block';
        this.parentNode.style.background = 'red';      
      });
      event.preventDefault();
    });
    // Esta es la fucnión que correrá cuando este listo el DOM
  });

  // allBoards.prototype.toggleBoard = function() {
  //   $( ".close" ).click(function() {
  //     $(this).parentsUntil("#" + boardSelector.id).remove();
  //   });
  // }

  var Board = function( selector ) {
    // Aqui denerá ir el código que tenga que ver con tu tablero
    this.id = selector;
    this.htmlCode = '<div id=\"' + selector + '\"' +
            ' style="background-color: #9e8d68; margin: 0; padding: 0; position: absolute; height: 100%; width: 90%; right: 0; top: 0;">'+
            '</div>';

    this.postIt = 'div id="postit"></div>'
    
    // // Utiliza esta sintaxis para referirte al selector que representa al tablero.
    // // De esta manera no dependerás tanto de tu HTML.
    // var $elem = $( selector );
  };

  Board.prototype.createBoard = function() {
    postItDiv = document.createElement('div');
    postItDiv.setAttribute("id", this.id);
    postItDiv.className = "board";
    postItDiv.style.background = getRandomColor();
    
    document.getElementsByTagName('body')[0].appendChild(postItDiv);

    var $elem = this.id;
    $( 'body' ).on( "dblclick", $($elem), function(e) {
      if (e.target.id == $elem) {
        var newPostIt = new PostIt();
        newPostIt.createPostIt($elem);
        newPostIt.makeDraggable($elem);
        newPostIt.closePostIt($elem);
        e.stopPropagation();
      }
    });
  }

  var PostIt = function() {
    this.htmlCode = "<div class=\"header\"><div class=\"close\">X</div></div><div class=\"content\" contenteditable=\"true\"></div>";
    this.id = "master";
    this.class = "post-it";
  };

  PostIt.prototype.createPostIt = function(boardSelector) { 
    var postIt = document.createElement('div');
    postIt.id = this.id;
    postIt.className = this.class;
    postIt.innerHTML = this.htmlCode;
    var menuWidth = $('#menu').width();
    document.getElementById(boardSelector).appendChild(postIt);
    $(postIt).css({"left" : event.pageX - menuWidth, "top" : event.pageY});
  }

  PostIt.prototype.makeDraggable = function(boardSelector) {
    $( ".board > div" ).draggable({
      handle: ".header",
      start: function( event, ui ) {
        ui.helper.css("z-index", "1");
        ui.helper.siblings().css("z-index", "0");
      }
    });
  }

  PostIt.prototype.closePostIt = function(boardSelector) {
    $( '.close' ).on( "click", function() {
      $(this).parentsUntil(".board").remove();
    });
  }
});

// http://stackoverflow.com/questions/842336/is-there-a-way-to-select-sibling-nodes
function getChildren(n, skipMe){
  var r = [];
  for ( ; n; n = n.nextSibling ) 
     if ( n.nodeType == 1 && n != skipMe)
        r.push( n );        
  return r; 
};

function getSiblings(n) {
  return getChildren(n.parentNode.firstChild, n);
}

// http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
