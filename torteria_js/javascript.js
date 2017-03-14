$( document ).ready(function() {  
  $( "#createOven" ).on( "submit", function( event ) {
    event.preventDefault();
    $(".oven").css("visibility", "visible");
  });

  $( "#ovenForm" ).on( "submit", function( event ) {
    event.preventDefault();
    var totalTime = $( "#time" ).val();
    var tortaType = $( "#tipoTorta" ).val();
    horno.cook(tortaType, totalTime);
  });
});

// Class Torta
function Torta(casi, lista) {
  this.casi = casi;
  this.lista = lista;
}

var milanesa = new Torta(2, 9);
var queso = new Torta(1, 6);
var jamon = new Torta(1, 3);


// Class TortaBatch
var batch = {};
batch["milanesa"] = milanesa
batch["queso"] = queso
batch["jamon"] = jamon

// Class Oven
function Oven() {
 
};

Oven.prototype.cook = function(tortaType, totalTime) {
  var timer = totalTime;
  function myTimer() {
    $('#timer').html(timer);
    cookStatus();
    endTimer();
    timer--;
  }

  function endTimer() {     
    if (timer === 0) {
      clearInterval(cook);
      fillHistory(tortaType);
    }
  }

  function cookStatus() {     
    if ((totalTime - timer) < batch[tortaType].casi) {
      $( "#timer" ).removeClass().addClass("Crudo").append("<p id=\'tortaState\'>Cruda</p>");
    } else if ((totalTime - timer) < batch[tortaType].lista) {
      $( "#timer" ).removeClass().addClass("Casi-listo").append("<p id=\'tortaState\'>Casi lista</p>");
    } else if ((totalTime - timer) === batch[tortaType].lista) {
      $( "#timer" ).removeClass().addClass("LISTO").append("<p id=\'tortaState\'>Lista</p>");
    } else if ((totalTime - timer) > batch[tortaType].lista) {
      $( "#timer" ).removeClass().addClass("QUEMADO").append("<p id=\'tortaState\'>Quemada</p>");
    }
  }

  var cook = setInterval(function(){ myTimer() }, 1000);
};

var horno = new Oven;

function fillHistory(tortaType) {
  $("#history").css("visibility", "visible");
  var tortaStatus = $( "#tortaState" ).text();
  $( "#history ol" ).append("<li>" + tortaType + " " + tortaStatus + "</li>");
}


