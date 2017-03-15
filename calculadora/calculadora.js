$( document ).ready(function() {  
  createCards();
  droppableContainer();
});

function createCards() {
  for (var i = 0; i < 10; i++) {
    $('<div data-card=' + i + '>' + i + '</div>').appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      helper: 'clone'
    });
  };
}

function droppableContainer() {
  $( "#cardSlots" ).droppable({
    accept: '#cardPile div',
    drop: droppedCard
  });
}

function droppedCard(event, ui) {
  ui.helper.clone().appendTo( '#cardSlots');
  var cardValue = ui.helper.data('card');
  calculator(cardValue);
}

function calculator(cardValue) {
  var resultSoFar = parseInt($( '#total_sum' ).text());
  var sum = cardValue + resultSoFar;
  $( '#total_sum' ).html(sum)
}