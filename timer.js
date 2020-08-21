class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    // DOM element references bound to timer
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.durationInput = durationInput;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onDurationChange = callbacks.onDurationChange;
    }

    // Add event listeners to bound DOM elements
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
    this.durationInput.addEventListener("focus", this.pause);
    this.durationInput.addEventListener("change", this.onDurationChange);
  }

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
      this.timeRemaining = (this.timeRemaining - .01);
    }
  };

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.intervalId = setInterval(this.tick, 10);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  get timeRemaining() {
    return this.durationInput.value;
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}