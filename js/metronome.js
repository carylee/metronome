var metronome = (function() {
  var display;
  var tempo = 60;
  var playback;
  var ticks;
  //var tick = document.getElementById("tick");
  //var tock = document.getElementById("tock");
  $(document).ready( function(){
    ticks = [
      document.getElementById("tick"),
      document.getElementById("tock"),
    ];
  });
  /*var ticks = [
    new Audio("audio/tick.mp3"),
    new Audio("audio/tock.mp3"),
    new Audio("audio/tick.mp3"),
    new Audio("audio/tock.mp3"),
    new Audio("audio/tick.mp3"),
    new Audio("audio/tock.mp3"),
  ]*/
  var tickIndex = 0;
  var beat = function() {
    ticks[tickIndex].play();
    tickIndex = (tickIndex + 1) % 2;
    display.toggle();
  }
  var start = function() {
    stop();
    var ms = 60/tempo * 1000;
    playback = setInterval( beat, ms );
  }
  var stop = function() {
    clearInterval(playback);
  }
  var setTempo = function( bpm ) {
    stop();
    if( !isNaN(bpm) && bpm ) {
      tempo = bpm;
    }
  }
  var canvas;
  var ctx;
  $(document).ready( function() {
    canvas = $("#visual canvas")[0];
    ctx = canvas.getContext('2d');
  });
  var display = (function(){
    var state = 0;
    var draw = function( state ) {
      $(canvas).width( $(canvas).parent().width() );
      ctx.clearRect(0,0,canvas.width,canvas.height);
      var width = canvas.width/2;
      ctx.fillRect(state*width,0,state*width+width,canvas.height);
    }
    var toggle = function() {
      draw( state );
      state = (state + 1) % 2;
    }
    return { toggle : toggle };
  }());

  return { 
    start : start,
    setTempo : setTempo,
    stop : stop,
   };
}());
$(document).ready( function() {
$("#start").click( function() {
  metronome.setTempo( $("#tempo").val() );
  metronome.start();
  });
$("div.button").toggle( function(){
    metronome.setTempo( $("#tempo").val() );
    metronome.start();
    $(this).children("span").html("Stop");
  },
  function() {
    metronome.stop();
    $(this).children("span").html("Start");
  });
$("input").click( function() {
  $(this).val("");
  });
window.top.scrollTo(0,1);
});
