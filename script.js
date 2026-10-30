const DEFAULT_MINUTES = 25;
const STORAGE_KEY = 'pomodoroMinutes';

function loadMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  return Number.isInteger(saved) && saved >= 1 && saved <= 60 ? saved : DEFAULT_MINUTES;
}

const FOCUS_SECONDS = loadMinutes() * 60;

const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const settingsBtn = document.getElementById('settings');

let remaining = FOCUS_SECONDS;
let intervalId = null;

function render() {
  const min = String(Math.floor(remaining / 60)).padStart(2, '0');
  const sec = String(remaining % 60).padStart(2, '0');
  timeEl.textContent = `${min}:${sec}`;
}

function startTimer() {
  if (intervalId !== null || remaining === 0) return;
  intervalId = setInterval(() => {
    remaining--;
    render();
    if (remaining === 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remaining = FOCUS_SECONDS;
  render();
}

render();

startBtn.onclick = startTimer;
stopBtn.onclick = stopTimer;
resetBtn.onclick = resetTimer;
settingsBtn.onclick = () => {
  location.href = 'settings.html';
};
