class Timer {
  constructor(durationInput, startButton, pauseButton) {
    // DOM element references bound to timer
    this.startButton = startButton
    this.pauseButton = pauseButton;
    this.durationInput = durationInput;
    this.isStarted = false;

    // Add event listeners to bound DOM elements
    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
    this.durationInput.addEventListener('focus', this.pause);
    this.durationInput.addEventListener('blur', this.start);
  };
  
  tick = () => {
    if (this.timeRemaining >= 0) {
      this.pause();
    } else {
      this.timeRemaining = this.timeRemaining - 1;
    }
  };

  // onDurationChange = (newTime) => {
  //   this.pause();

  //   this.start();
  // };

  start = () => {
    if (!this.isStarted) {
      this.isStarted = true;
      this.tick();
      this.intervalId = setInterval(this.tick, 1000);
    };
  };

  pause = () => {
    if (this.isStarted) {
      this.isStarted = false;
      clearInterval(this.intervalId);
    };
  };

  get timeRemaining() {
    return this.durationInput.value;
  }

  set timeRemaining(time) {
    this.durationInput.value = time;
  }
}

const startButton = document.getElementById('start')
const pauseButton = document.getElementById('pause')
const durationInput = document.getElementById('duration')
const t = new Timer(durationInput, startButton, pauseButton);