export default class Sound {

  constructor() {

    /*
    this.sounds = [];
    for(var i = 1; i <= 60; i++)
    {
          var sound = new Audio("/audio/stimuli/stimuli_" + i + "_level3.mp3");
          this.sounds.push(sound);
    }

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.n = this.getRandomInt(1, this.sounds.length);
    this.activeSound = this.sounds[this.n];
    this.source = this.audioCtx.createMediaElementSource(this.activeSound);
    this.panNode = this.audioCtx.createStereoPanner();
    this.source.connect(this.panNode);
    this.panNode.connect(this.audioCtx.destination);
    */
    this.correctSound = new Audio("/audio/correctSound.mp3");
    this.incorrectSound = new Audio("/audio/incorrectSound.mp3");
    this.whereLongSound = new Audio("/audio/whereLong.wav");
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.source = this.audioCtx.createMediaElementSource(this.whereLongSound);
    this.panNode = this.audioCtx.createStereoPanner();
    this.source.connect(this.panNode);
    this.panNode.connect(this.audioCtx.destination);

  }

  play() {
    //activeSound.play();
    this.whereLongSound.play();
  }

  pickRandomSound() {
    var n = this.getRandomInt(1, sounds.length);
    return this.sounds[n];
  }

  // Returns a random integer between min (included) and max (included)
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getNewSound() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.n = this.getRandomInt(1, this.sounds.length);
    this.activeSound = this.sounds[this.n];
    this.source = this.audioCtx.createMediaElementSource(this.activeSound);
    this.panNode = this.audioCtx.createStereoPanner();
    this.source.connect(this.panNode);
    this.panNode.connect(this.audioCtx.destination);
  }

  // -1 = left/blue, 1 = right/red
  pickRandomSide() {
    var random = this.getRandomInt(1, 2);
    if(random == 1) {
      this.panNode.pan.value = -1;
      return "blue";
    } else {
      this.panNode.pan.value = 1;
      return "red";
    }
  }

  setSide(side) {
    if(side == "left") {
      this.panNode.pan.value = -1;
    } else {
      this.panNode.pan.value = 1;
    }
  }
}
