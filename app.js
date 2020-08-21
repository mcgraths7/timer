class Timer {
  constructor(durationInput, startButton, pauseButton) {
    // DOM element references bound to timer
    this.startButton = startButton
    this.pauseButton = pauseButton;
    this.durationInput = durationInput;
    
    // Internal Properties
    this.startTime = parseInt(durationInput.value);
    this.currentTime = parseInt(durationInput.value);
    this.intervalId = undefined;

    // Bind context of "this" so we can use arrow functions
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);

    // Add event listeners to bound DOM elements
    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
    this.durationInput.addEventListener('change', (e) => {
      this.startTime = e.currentTarget.value;
      this.currentTime = e.currentTarget.value;
    });
    this.durationInput.addEventListener('focus', () => {
      this.pause();
    });
    this.durationInput.addEventListener('blur', () => {
      this.start();
    });
  }
  
  tick() {
    if (this.currentTime === 0) {
      return this.pause();
    }
    this.currentTime -= 1;
    const tickEvent = new CustomEvent('tick', { detail: {
      startTime: this.startTime,
      currentTime: this.currentTime,
    }});
    dispatchEvent(tickEvent);
    console.log(this.currentTime);
  }

  onDurationChange(newTime) {
    this.pause();
    this.startTime = newTime;
    this.currentTime = newTime;
    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      this.tick()
    }, 1000);
  }

  pause() {
    clearInterval(this.intervalId);
  }
}

const startButton = document.getElementById('start')
const pauseButton = document.getElementById('pause')
const durationInput = document.getElementById('duration')
const t = new Timer(durationInput, startButton, pauseButton);