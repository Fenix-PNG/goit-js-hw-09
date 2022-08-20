import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const button = document.querySelector('button[data-start]');
const dateChosen = document.querySelector('#datetime-picker');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

let timer = null;

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    if (selectedDate[0] <= new Date()) {
      button.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      button.disabled = false;

      button.addEventListener('click', countdownTime);

      function countdownTime() {
        timer = setInterval(() => {
          button.disabled = true;

          const dateChoosenMs = new Date(
            dateChosen.value.replace(/-/g, '/')
          ).getTime();
          const now = new Date().getTime();
          const timeLeft = dateChoosenMs - now;

          const { days, hours, minutes, seconds } = convertMs(timeLeft);

          day.innerHTML = days < 10 ? addLeadingZero(days) : days;
          hour.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
          minute.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
          second.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

          if (timeLeft < 1000) {
            clearInterval(timer);
            button.disabled = false;
          }
        }, 1000);
      }

      function addLeadingZero(value) {
        const stringValue = String(value);
        return stringValue.padStart(2, '0');
      }

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
    }
  },
};

flatpickr(dateChosen, options);
