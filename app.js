const startButton = document.getElementById('start')
const pauseButton = document.getElementById('pause')
const durationInput = document.getElementById('duration')
const circle = document.querySelector('circle');
const radius = circle.getAttribute('r');
const perimeter = Math.PI * radius * 2;
circle.setAttribute("stroke-dasharray", perimeter);
let duration;
const t = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    console.log('Timer started')
    duration |= totalDuration;
  },
  onTick(timeRemaining) {
    const offsetValue = perimeter * timeRemaining / duration - perimeter;
    circle.setAttribute('stroke-dashoffset', offsetValue);
  },
  onComplete() {
    alert('Timer complete')
  }
});