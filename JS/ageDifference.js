const firstPersonName = document.getElementById("firstPersonName");
const firstPersonAge = document.getElementById("firstPersonAge");
const secondPersonName = document.getElementById("secondPersonName");
const secondPersonAge = document.getElementById("secondPersonAge");

// Buttons Selectors
const calculateBtn = document.getElementById("calculate");
const clearBtn = document.getElementById("clear");

const displayDiff = document.querySelector(".calculated-age-difference");
const diffYear = document.getElementById("years");
const diffMonth = document.getElementById("months");
const diffDays = document.getElementById("days");
const firstPersonDay = document.getElementById("fDay");
const secondPersonDay = document.getElementById("sDay");

// Add Event Listneres

calculateBtn.addEventListener("click", () => {
  const fPersonName = firstPersonName.value;
  const fPersonAge = firstPersonAge.value;
  const sPersonName = secondPersonName.value;
  const sPersonAge = secondPersonAge.value;
  if (fPersonAge && sPersonAge) {
    ageDifference(fPersonAge, sPersonAge, fPersonName, sPersonName);
  }
});

firstPersonAge.addEventListener("change", () => {
  const fPersonAge = new Date(
    firstPersonAge.value.split("-").join("-")
  ).getDay();
  firstPersonDay.textContent = weekDays[fPersonAge];
});

secondPersonAge.addEventListener("change", () => {
  const sPersonAge = new Date(
    secondPersonAge.value.split("-").join("-")
  ).getDay();
  secondPersonDay.textContent = weekDays[sPersonAge];
});

clearBtn.addEventListener("click", () => {
  displayDiff.classList.remove("show");
  firstPersonName.value = "";
  firstPersonAge.value = "";
  secondPersonName.value = "";
  secondPersonAge.value = "";
});

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function ageDifference(fAge, sAge, fName, sName) {
  fAge = fAge.split("-");
  const fAgeinMilli = new Date(fAge.join("-")).getTime();
  //   using unary + operator for converting all string digit to Number
  let fYear = +fAge[0];
  let fMonth = +fAge[1];
  let fDate = +fAge[2];

  sAge = sAge.split("-");
  const sAgeinMilli = new Date(sAge.join("-")).getTime();
  let sYear = +sAge[0];
  let sMonth = +sAge[1];
  let sDate = +sAge[2];
  var cYear;
  var cMonth;
  var cDate;
  var name1;
  var name2;

  const biggerDisc = document.querySelector(".biggerDisc");
  if (fAgeinMilli === sAgeinMilli) {
    cYear = 0;
    cMonth = 0;
    cDate = 0;
    biggerDisc.style.display = "none";
  } else if (fAgeinMilli < sAgeinMilli) {
    cDate = sDate - fDate;
    var carryMonth = 0;
    if (cDate < 0) {
      carryMonth = 1;
      cDate += new Date(fYear, fMonth - 1, 0).getDate();
    }
    cMonth = sMonth - fMonth - carryMonth;
    carryMonth = 0;
    if (cMonth < 0) {
      carryMonth = 1;
      cMonth += 12;
    }
    cYear = sYear - fYear - carryMonth;
    name1 = fName;
    name2 = sName;
  } else {
    cDate = fDate - sDate;
    var carryMonth = 0;
    if (cDate < 0) {
      carryMonth = 1;
      cDate += new Date(fYear, fMonth - 1, 0).getDate();
    }
    cMonth = fMonth - sMonth - carryMonth;
    carryMonth = 0;
    if (cMonth < 0) {
      carryMonth = 1;
      cMonth += 12;
    }
    cYear = fYear - sYear - carryMonth;
    name1 = sName;
    name2 = fName;
  }

  cYear < 10 ? (cYear = `0${cYear}`) : cYear;
  cMonth < 10 ? (cMonth = `0${cMonth}`) : cMonth;
  cDate < 10 ? (cDate = `0${cDate}`) : cDate;

  displayDiff.classList.add("show");
  diffYear.textContent = cYear;
  diffMonth.textContent = cMonth;
  diffDays.textContent = cDate;
  let firstPersonAge = calculateAge(fAge);
  let secondPersonAge = calculateAge(sAge);
  const fCalcYear = document.getElementById("fCalcYear");
  const fCalcMonth = document.getElementById("fCalcMonth");
  const fCalcDate = document.getElementById("fCalcDate");
  const sCalcYear = document.getElementById("sCalcYear");
  const sCalcMonth = document.getElementById("sCalcMonth");
  const sCalcDate = document.getElementById("sCalcDate");

  fCalcYear.textContent = firstPersonAge.year;
  fCalcMonth.textContent = firstPersonAge.month;
  fCalcDate.textContent = firstPersonAge.date;
  sCalcYear.textContent = secondPersonAge.year;
  sCalcMonth.textContent = secondPersonAge.month;
  sCalcDate.textContent = secondPersonAge.date;

  if (fName && sName) {
    biggerDisc.innerHTML = `
          <span id="bigger">${name1} </span>Bigger Than
              <span id="smaller">${name2}!</span>`;
  } else {
    biggerDisc.innerHTML = `Enter Name for Better understanding`;
  }
}

function calculateAge(age) {
  let cDate = new Date().getDate();
  let cMonth = new Date().getMonth() + 1;
  let cYear = new Date().getFullYear();

  let personDate = age[2];
  let personMonth = age[1];
  let personYear = age[0];

  let d = cDate - personDate;
  let borrowMonth = 0;
  if (d < 0) {
    borrowMonth = 1;
    d += new Date(cYear, cMonth, cDate).getDate();
  }
  let m = cMonth - personMonth - borrowMonth;
  borrowMonth = 0;
  if (m < 0) {
    borrowMonth = 1;
    m += 12;
  }

  let y = cYear - personYear - borrowMonth;
  m < 10 ? (m = `0${m}`) : m;
  d < 10 ? (d = `0${d}`) : d;
  return { year: y, month: m, date: d };
}
theme();
function theme() {
  const selectedTheme = JSON.parse(localStorage.getItem("theme"));
  document.body.classList.add(selectedTheme);
}
