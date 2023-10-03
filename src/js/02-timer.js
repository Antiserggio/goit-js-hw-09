import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let intervalId = null;

const refs = {
  calendar: document.querySelector('input#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickr(refs.calendar, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function startTimer() {
  intervalId = setInterval(() => {
    let currentDate = new Date(refs.calendar.value) - new Date();
    refs.btnStart.disabled = true;

    if (currentDate <= 0) {
      clearInterval(intervalId);
      refs.btnStart.disabled = true;
      return;
    } else {
      let time = convertMs(currentDate);
      refs.days.textContent = addLeadingZero(time.days);
      refs.hours.textContent = addLeadingZero(time.hours);
      refs.minutes.textContent = addLeadingZero(time.minutes);
      refs.seconds.textContent = addLeadingZero(time.seconds);
      refs.btnStart.disabled = true;
      refs.calendar.disabled = true;
    }
  }, 1000);
}
