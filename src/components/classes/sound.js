export default class Sound {

  constructor() {

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.panNode = this.audioCtx.createStereoPanner();
    this.correctSound = new Audio("/audio/correctSound.mp3");
    this.incorrectSound = new Audio("/audio/incorrectSound.mp3");
    this.whereLongSound = new Audio("/audio/whereLong.wav");
    this.whereSource = this.audioCtx.createMediaElementSource(this.whereLongSound);
    this.sounds = [];
    this.sources = [];

    for(var i = 1; i <= 29; i++)
    {
          var sound = new Audio("/audio/stimuli/stimuli_" + i + "_level_4_split.wav");
          this.sounds.push(sound);
          this.sources.push(this.audioCtx.createMediaElementSource(sound))
    }
    this.rand = this.getRand();
    //this.activeSound = this.sounds[this.rand];
    //this.source = this.sources[this.rand];
    this.activeSound = this.whereLongSound;
    this.source = this.whereSource;
    this.source.connect(this.panNode);
    this.panNode.connect(this.audioCtx.destination);
  }

  play() {
    this.activeSound.play();
  }

  pickRandomSound() {
    this.rand = this.getRand();
    this.activeSound = this.sounds[this.rand];
    this.source = this.sources[this.rand];
    this.source.connect(this.panNode);
    this.panNode.connect(this.audioCtx.destination);
  }

  // Returns a random integer between min (included) and max (included)
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRand() {
    return this.getRandomInt(1, this.sounds.length) - 1;
  }

  // -1 = left/blue, 1 = right/red
  pickRandomSide() {
    this.pickRandomSound();
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
