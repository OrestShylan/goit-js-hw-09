const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.start.addEventListener('click', clickStart);
refs.stop.addEventListener('click', clickStop);

function clickStart(evt) {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.start.disabled = true;
  refs.stop.disabled = false;
}

function clickStop(evt) {
  clearInterval(timerId);
  refs.start.disabled = false;
  refs.stop.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
