const CHANGE_COLOR_INT = 1000;
let id = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', startChangeColor);
refs.btnStop.addEventListener('click', stopChangeColor);

function startChangeColor() {
  id = setInterval(() => {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
    const color = getRandomHexColor();
    refs.body.style.backgroundColor = color;
  }, CHANGE_COLOR_INT);
}

function stopChangeColor() {
  clearInterval(id);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
