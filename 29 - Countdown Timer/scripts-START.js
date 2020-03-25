let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const form = document.querySelector('[name="customForm"]');

function timer(seconds) {
  //clear any existing timers
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if should stop it!!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainerSeconds = seconds % 60;
  //en el remainderSeconds pase a string, para poder usar la funcion padStart
  //Use la funcion padStart para que cuando los segundos fueran mejor a 10 se pusiera un 0 delante del primer digito
  const display = `${minutes}:${remainerSeconds.toString().padStart(2, "0")}`;
  timerDisplay.textContent = display;
  //para poner en la pestana del documento, el contador actual
  document.title = display;
  console.log({ minutes, remainerSeconds });
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTime.textContent = `Be back At ${adjustedHour}:${minutes}`;
}

function startTimer(e) {
  const seconds = parseInt(e.target.dataset.time);
  timer(seconds);
  console.log(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const mins = e.target.minutes.value;
  timer(mins * 60);
  e.target.reset();
  console.log(mins);
});
