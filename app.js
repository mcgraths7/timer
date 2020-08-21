
const startButton = document.getElementById('start')
const pauseButton = document.getElementById('pause')
const durationInput = document.getElementById('duration')
const t = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log('Timer started')
  },
  onTick() {
    console.log('Tick')
  },
  onComplete() {
    console.log('Timer complete')
  },
  onDurationChange() {

  }
});