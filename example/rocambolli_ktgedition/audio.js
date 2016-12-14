var how_mainmusic = new Howl({
  src: ['audio/main.mp3'],
  loop: true
});
var how_coin = new Howl({
  src: ['audio/coin.wav'],
  volume: 0.6
});
var how_jump = new Howl({
  src: ['audio/jump.wav'],
  volume: 0.7
});
var how_nextlevel = new Howl({
  src: ['audio/nextlevel.wav'],
  volume: 0.8
});
var how_die = new Howl({
  src: ['audio/fail.wav'],
  volume: 0.8
});
var how_rocambolli = new Howl({
  src: ['audio/rocambolli.wav'],
  volume: 0.8
});

function audio_start(){
  how_mainmusic.play();
}

function audio_coin(){
  how_coin.play();
}

function audio_jump(){
  how_jump.play();
}

function audio_nextlevel(){
  how_nextlevel.play();
}

function audio_die(){
  how_die.play();
}
function audio_rocambolli(){
  how_rocambolli.play();
}
