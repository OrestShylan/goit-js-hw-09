// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/confetti.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
  value: document.querySelector('.value'),
};

refs.btnStart.addEventListener('click', clickStart);

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0].getTime();
    const currentDate = Date.now();
    if (currentDate > date) {
      alert('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
  },
};

const selectDate = flatpickr(refs.input, options);
refs.btnStart.disabled = true;

function clickStart(evt) {
  const startDate = selectDate.selectedDates[0];

  timerId = setInterval(() => {
    const dateCurrent = Date.now();
    const anotherDate = startDate - dateCurrent;
    refs.btnStart.disabled = true;
    refs.input.disabled = true;

    if (anotherDate < 0) {
      clearInterval(timerId);
      alert('Your time is up');
      refs.btnStart.disabled = false;
      refs.input.disabled = false;

      return;
    }

    const time = convertMs(anotherDate);

    updateTimer(time);
  }, 1000);
}

//!==============================================================================================
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
