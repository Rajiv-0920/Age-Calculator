// ---------------------------------
// --------- Calculate Age ---------
// ---------------------------------

// For CurrentDate Input
const currentDate = document.getElementById("currentDate");
const currentDay = document.getElementById("currentDay");
// For BirthDate Input
const birthDate = document.getElementById("birthDate");
const birthDay = document.getElementById("birth-day");

// For Calculate Year, Month or Date Element Selectors
const calcDate = document.getElementById("calculated-date");
const calcMonth = document.getElementById("calculated-month");
const calcYear = document.getElementById("calculate-year");

// For Calculate Next Birth Months or Date Element Selectors
const leftMonth = document.getElementById("month-left");
const leftDays = document.getElementById("days-left");
const nextBirthDay = document.getElementById("next-birthday");

// For Calculation Button
const calculateBtn = document.getElementById("calculate");
const clearBtn = document.getElementById("clear");

// for Extras Details Element Selector
const totalYears = document.getElementById("total-years");
const totalMonths = document.getElementById("total-months");
const totalWeeks = document.getElementById("total-weeks");
const totalDays = document.getElementById("total-days");
const totalHours = document.getElementById("total-hours");
const totalMinutes = document.getElementById("total-minutes");
const totalSeconds = document.getElementById("total-seconds");

// for Upcoming Details Element Selector
const extrasData = document.querySelector("#upcoming-Data");
const dateOfBirth = document.querySelectorAll(".dateOfBirth");
const nextYearBirthDay = document.querySelectorAll(".nextYearBirthDay");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// Event Listners Start
window.addEventListener("DOMContentLoaded", () => {
  getCurrentDate();
});
currentDate.addEventListener("change", () => {
  getCurrentDate();
});
birthDate.addEventListener("change", () => {
  getDateOfBirth();
});
function showError(text) {
  const message = document.querySelector(".message");
  message.classList.add("show");
  message.innerHTML = `<p>${text} :)</p>`;
  setTimeout(() => {
    message.classList.remove("show");
  }, 1500);
}
calculateBtn.addEventListener("click", () => {
  birthDate.value === "" ? showError("Enter Date of Birth") : calculateAge();
});
clearBtn.addEventListener("click", () => {
  clearAll();
});
// Event Listners End
// Function Start
function clearAll() {
  calcYear.textContent = "00";
  calcMonth.textContent = "00";
  calcDate.textContent = "00";
  leftMonth.textContent = "00";
  leftDays.textContent = "00";
  const dte = new Date();
  let d = dte.getDate();
  let m = dte.getMonth();
  let y = dte.getFullYear();
  m < 10 ? (m = `0${m}`) : m;
  d < 10 ? (d = `0${d}`) : d;
  currentDate.value = `${y}-${m}-${d}`;
  birthDate.value = "";
  totalYears.textContent = "0";
  totalMonths.textContent = "0";
  totalWeeks.textContent = "0";
  totalDays.textContent = "0";
  totalHours.textContent = "0";
  totalMinutes.textContent = "0";
  totalSeconds.textContent = "0";
  birthDay.textContent = "";
  nextBirthDay.textContent = "";
  extrasData.classList.add("hide");
}
function getCurrentDate() {
  let cdayNum;
  let cDate;
  let cMonth;
  let cYear;

  if (currentDate.value === "") {
    cDate = new Date().getDate();
    cMonth = new Date().getMonth() + 1;
    cYear = new Date().getFullYear();

    cMonth < 10 ? (cMonth = `0${cMonth}`) : cMonth;
    cDate < 10 ? (cDate = `0${cDate}`) : cDate;

    currentDate.value = `${cYear}-${cMonth}-${cDate}`;
  } else {
    cDate = currentDate.value.split("-")[2];
    cMonth = currentDate.value.split("-")[1];
    cYear = currentDate.value.split("-")[0];

    cMonth < 10 ? (cMonth = `0${cMonth}`) : cMonth;
    cDate < 10 ? (cDate = `0${cDate}`) : cDate;
  }

  cdayNum = new Date(`${cYear}-${cMonth}-${cDate}`).getDay();
  currentDay.textContent = weekDays[cdayNum];

  return { cDayNum: cdayNum, cDate: +cDate, cMonth: +cMonth, cYear: +cYear };
}

function getDateOfBirth() {
  let bDate = birthDate.value.split("-")[2];
  let bMonth = birthDate.value.split("-")[1];
  let bYear = birthDate.value.split("-")[0];

  let bdayNum = new Date(`${bYear}-${bMonth}-${bDate}`).getDay();

  birthDay.textContent = weekDays[bdayNum];

  return { bDayNum: bdayNum, bDate: +bDate, bMonth: +bMonth, bYear: +bYear };
}

function calculateAge() {
  let { cDayNum, cDate, cMonth, cYear } = getCurrentDate();
  let { bDayNum, bDate, bMonth, bYear } = getDateOfBirth();

  let d = cDate - bDate;
  var carryMonth = 0;
  var carryYear = 0;

  if (d < 0) {
    carryMonth = 1;
    d += getDaysInMonth(cMonth, cYear);
  }

  let m = cMonth - bMonth - carryMonth;
  if (m < 0) {
    carryYear = 1;
    m += 12;
  }

  let y = cYear - bYear - carryYear;
  if (y < 0) {
    showError("Birth date cannot be greater than today's ");
    clearAll();
  } else {
    d < 10 ? (d = `0${d}`) : d;
    m < 10 ? (m = `0${m}`) : m;

    calcDate.textContent = d;
    calcMonth.textContent = m;
    calcYear.textContent = y;

    // Calculation of Next Birthday
    let nBirthMonth = bMonth;
    let nBirthDate = bDate;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    let nDate = nBirthDate - date;

    carryMonth = 0;
    if (nDate < 0) {
      carryMonth = 1;
      nDate += getDaysInMonth(month, year);
    }
    let nMonth = nBirthMonth - carryMonth - month;
    carryYear = 0;
    if (nMonth < 0) {
      carryYear = 12;
      nMonth += carryYear;
    }
    nDate < 10 ? (nDate = `0${nDate}`) : nDate;
    nMonth < 10 ? (nMonth = `0${nMonth}`) : nMonth;
    leftMonth.textContent = nMonth;
    leftDays.textContent = nDate;

    // Calculation of Next Birth Day
    date = +cDate + +nDate;
    carryMonth = 0;
    if (date > getDaysInMonth(nMonth - 1, year)) {
      carryMonth = 1;
      // date -= getDaysInMonth(nMonth - 1, year);
    }
    month = +cMonth + +nMonth + carryMonth;

    carryYear = 0;
    if (month > 12) {
      carryYear = 1;
      // month = 12;
    }
    year += carryYear;
    bDate < 10 ? (bDate = `0${bDate}`) : bDate;
    bMonth < 10 ? (bMonth = `0${bMonth}`) : bMonth;
    let day = new Date(`${year}-${bMonth}-${bDate}`).getDay();
    nextBirthDay.textContent = weekDays[day];

    totalYears.textContent = y;
    // + sign use for for convert string to number like. +year or +month
    let totalMonth = +y * 12 + +m;
    totalMonths.textContent = totalMonth;
    let totalWeek = totalMonth * 4.345 + +d / 7;
    totalWeeks.textContent = Math.round(totalWeek);
    let totalDay = Math.round(totalWeek * 7);
    totalDays.textContent = totalDay;
    totalHours.textContent = totalDay * 24;
    totalMinutes.textContent = totalDay * 24 * 60;
    totalSeconds.textContent = totalDay * 24 * 60 * 60;
    extrasData.classList.remove("hide");
    upcomingDates(bDate, bMonth, year);
  }
}

var getDaysInMonth = function (cMonth, cYear) {
  return new Date(cYear, cMonth, 0).getDate();
};

function upcomingDates(date, month, year) {
  dateOfBirth.forEach((value, index) => {
    value.textContent = `${date} ${monthNames[month - 1]} ${year++}`;
    nextYearBirthDay[index].textContent =
      weekDays[new Date(value.innerText).getDay()];
  });
}
// Function End

// Selected Theme
theme();
function theme() {
  const selectedTheme = JSON.parse(localStorage.getItem("theme"));
  document.body.classList.add(selectedTheme);
}
