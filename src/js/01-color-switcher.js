function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();
    buttonStart.setAttribute('disabled', true);
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  buttonStart.removeAttribute('disabled');
});
console.log(buttonStart);
console.log(buttonStop);
