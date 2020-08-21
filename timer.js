class Timer {
  constructor(startTime) {
    this.startTime = startTime;
    this.currentTime = startTime;
    this.intervalId = undefined;
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
  }

  tick() {
    this.currentTime -= 1;
    const tickEvent = new CustomEvent('tick', {
      detail: {
        startTime: this.startTime,
        currentTime: this.currentTime,
      }
    });
    dispatchEvent(tickEvent);
    console.log(tickEvent.detail);

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

export default Timer;