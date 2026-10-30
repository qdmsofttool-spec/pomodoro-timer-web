const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const STORAGE_KEY = 'pomodoroMinutes';

const input = document.getElementById('minutes');
const doneBtn = document.querySelector('.btn-done');

function parseMinutes() {
  const value = input.value.trim();
  if (value === '') return null;
  const minutes = Number(value);
  if (!Number.isInteger(minutes)) return null;
  if (minutes < MIN_MINUTES || minutes > MAX_MINUTES) return null;
  return minutes;
}

function updateButton() {
  doneBtn.disabled = parseMinutes() === null;
}

function saveSettings() {
  const minutes = parseMinutes();
  if (minutes === null) return;
  localStorage.setItem(STORAGE_KEY, String(minutes));
  location.href = 'index.html';
}

const saved = Number(localStorage.getItem(STORAGE_KEY));
if (Number.isInteger(saved) && saved >= MIN_MINUTES && saved <= MAX_MINUTES) {
  input.value = saved;
}

input.oninput = updateButton;
doneBtn.onclick = saveSettings;
updateButton();
