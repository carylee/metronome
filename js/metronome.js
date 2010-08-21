var metronome = (function() {
  var tempo = 280;
  var playback;
  //var tick = document.getElementById("tick");
  //var tock = document.getElementById("tock");
  /*var ticks = [
    document.getElementById("tick"),
    document.getElementById("tock"),
  ];*/
  var ticks = [
    new Audio("audio/tick.mp3"),
    new Audio("audio/tock.mp3"),
    //new Audio("audio/tick.mp3"),
    //new Audio("audio/tock.mp3"),
  ]
  var tickIndex = 0;
  var beat = function() {
    ticks[tickIndex].play();
    tickIndex = (tickIndex + 1) % 2;
  }
  var start = function() {
    var ms = 60/tempo * 1000;
    playback = setInterval( beat, ms );
  }
  var stop = function() {
    clearInterval(playback);
  }
  var setTempo = function( bpm ) {
    stop();
    tempo = bpm;
  }
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
});
