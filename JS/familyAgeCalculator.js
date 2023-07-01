// Selecotrs of Person Details
const img = document.getElementById("visiter-img");
const personName = document.getElementById("name");
const showBirthday = document.getElementById("birthday");
const calculatedYear = document.getElementById("year");
const calculatedMonth = document.getElementById("month");
const calculatedDate = document.getElementById("days");
const monthsLeft = document.getElementById("left-months");
const daysLeft = document.getElementById("left-days");
const category = document.querySelectorAll(".category");
const title = document.getElementById("title");

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

// for Delete or Rename Button Element Selector
const deleteBtn = document.getElementById("delete");
const renameEl = document.getElementById("rename");
const update = document.getElementById("update");
const cancelBtn = document.getElementById("cancel");
const memberName = document.getElementById("updateName");
const optionsEl = document.querySelectorAll(".options");
const cameraImgBtn = document.querySelector(".img");
const memberImg = document.getElementById("img");
const memberDetails = document.querySelector(".member-details");
const imgBtn = document.querySelector(".camera-container");
const memberImgInput = document.getElementById("memberImg");
let updatedDateOfBirth = document.getElementById("dateOfBirth");

let optionChecked;
let imgValue;

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
// Event Listners

window.addEventListener("DOMContentLoaded", () => {
  const getDetails = JSON.parse(localStorage.getItem("personInfo"));
  getDetails.img === undefined
    ? (getDetails.img = `http://127.0.0.1:3000/images/man.png`)
    : getDetails.img;
  img.src = getDetails.img;
  personName.textContent = getDetails.name;
  category.forEach((cat) => {
    cat.textContent = getDetails.category;
  });

  let birthDate = getDetails.d;
  let birthMonth = getDetails.m;
  const birthYear = getDetails.y;

  getDetails.category !== "birthday"
    ? (getDetails.category = "Anniversary")
    : (getDetails.category = "Date of Birth");
  title.textContent = getDetails.category;

  birthDate < 10 ? (birthDate = `0${birthDate}`) : birthDate;
  birthMonth < 10 ? (birthMonth = `0${birthMonth}`) : birthMonth;

  const d = `${birthYear}-${birthMonth}-${birthDate}`;

  const birthDay = new Date(d).getDay();

  showBirthday.textContent = `${weekDays[birthDay]}, ${birthDate} ${
    month[birthMonth - 1]
  } ${birthYear}`;

  calculateAge(+birthDate, +birthMonth, +birthYear);
});

deleteBtn.addEventListener("click", () => {
  let person = JSON.parse(localStorage.getItem("personInfo"));
  let details = JSON.parse(localStorage.getItem("details"));
  const newdetails = details.filter((member, index) => {
    return index !== person.itemNo ? true : false;
  });
  localStorage.setItem("personInfo", JSON.stringify(""));
  localStorage.setItem("details", JSON.stringify(newdetails));
  history.back();
});
renameEl.addEventListener("click", () => {
  rename();
});
cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearData();
});
update.addEventListener("click", (e) => {
  updateData(e);
});
optionsEl.forEach((option) =>
  option.addEventListener("click", () => {
    optionsEl.forEach((value) => value.removeAttribute("checked"));
    option.setAttribute("checked", true);
  })
);
// functions
function calculateAge(userBirthDate, userBirthMonth, userBirthYear) {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  let month = 0;
  let date = 0;
  let year = 0;
  let carry = 0;
  let carryMonths = 0;

  if (currentDate < userBirthDate) {
    carry = 1;
    date =
      currentDate +
      getDaysInMonth(currentMonth - 1, currentYear) -
      userBirthDate;
  } else {
    date = currentDate - userBirthDate;
  }

  if (currentDate === userBirthDate || currentMonth > userBirthMonth) {
    month = currentMonth - userBirthMonth - carry;
  } else if (
    currentDate < userBirthDate ||
    (currentDate > userBirthDate && currentMonth <= userBirthMonth)
  ) {
    if (!(currentDate > userBirthDate && currentMonth === userBirthMonth)) {
      carryMonths = 12;
    }
    month = currentMonth + carryMonths - userBirthMonth - carry;
  }

  if (carryMonths === 12) {
    year = currentYear - userBirthYear - 1;
  } else {
    year = currentYear - userBirthYear;
  }

  if (userBirthDate === undefined || userBirthMonth === undefined) {
    year = "0";
    month = "0";
    date = "0";
  }

  year < 10 ? (year = `0${year}`) : year;
  month < 10 ? (month = `0${month}`) : month;
  date < 10 ? (date = `0${date}`) : date;

  calculatedYear.textContent = year;
  calculatedMonth.textContent = month;
  calculatedDate.textContent = date;

  // Calculation of Next Birthday
  nextBirthday(+date, +month, currentMonth, currentYear);

  totalYears.textContent = year;
  // + sign use for for convert string to number like. +year or +month
  let totalMonth = +year * 12 + +month;
  totalMonths.textContent = totalMonth;
  let totalWeek = totalMonth * 4.345 + +date / 4.345;
  totalWeeks.textContent = Math.round(totalWeek);
  let totalDay = Math.round(totalMonth * 30.417);
  totalDays.textContent = totalDay;
  totalHours.textContent = totalDay * 24;
  totalMinutes.textContent = totalDay * 24 * 60;
  totalSeconds.textContent = totalDay * 24 * 60 * 60;
  extrasData.classList.remove("hide");
  upcomingDates(userBirthDate, userBirthMonth, currentYear);
}

function nextBirthday(date, month, currentMonth, currentYear) {
  year < 10 ? (year = +`0${year}`) : year;
  month < 10 ? (month = +`0${month}`) : month;
  date < 10 ? (date = +`0${date}`) : date;

  let leftMonth;
  let leftDay;
  let borrow;
  if (date > 0) {
    borrow = 1;
    leftDay = getDaysInMonth(currentMonth - 1, currentYear) - +date;
  } else {
    borrow = 0;
    leftDay = `00`;
    leftMonth = `00`;
  }

  if (borrow === 1) {
    leftMonth = 12 - +month - borrow;
  } else if (month !== 0) {
    leftMonth = 12 - +month - borrow;
  } else {
    leftMonth = `00`;
  }
  if (leftMonth < 10 && leftMonth > 0) {
    leftMonth = `0${leftMonth}`;
  }
  if (leftDay < 10 && leftDay > 0) {
    leftDay = `0${leftDay}`;
  }
  monthsLeft.textContent = leftMonth;
  daysLeft.textContent = leftDay;
}

var getDaysInMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
};

function upcomingDates(d, m, y) {
  dateOfBirth.forEach((value, index) => {
    value.textContent = `${d} ${month[m - 1]} ${++y}`;
    nextYearBirthDay[index].textContent =
      weekDays[new Date(value.innerText).getDay()];
  });
}

const containerEl = document.querySelector(".container");
function rename() {
  memberDetails.classList.toggle("show");
  containerEl.classList.toggle("show");
  const tempInfo = JSON.parse(localStorage.getItem("personInfo"));

  tempInfo.m < 10 ? (tempInfo.m = `0${tempInfo.m}`) : tempInfo.m;
  tempInfo.d < 10 ? (tempInfo.d = `0${tempInfo.d}`) : tempInfo.d;
  updatedDateOfBirth.value = [tempInfo.y, tempInfo.m, tempInfo.d].join("-");

  memberName.value = tempInfo.name;
  memberImg.src = tempInfo.img;
  memberImg.classList.toggle("show");
  cameraImgBtn.classList.toggle("hide");
  optionsEl.forEach((option) => {
    if (tempInfo.category === option.dataset.event) {
      option.setAttribute("checked", true);
    }
  });
}

function clearData() {
  memberDetails.classList.toggle("show");
  containerEl.classList.toggle("show");
  setTimeout(() => {
    memberImg.classList.toggle("show");
    cameraImgBtn.classList.toggle("hide");
    dateOfBirth.value = "";
    memberImg.src = "";
    memberName.value = "";
    // optionsEl.forEach((option) => {
    //   option.checked = false;
    // });
    // from img reset
  }, 500);
}

imgBtn.addEventListener("click", () => {
  memberImgInput.value = "";
  memberImgInput.click();
});

memberImgInput.addEventListener("change", () => {
  getUserSelectedImg();
});

function getUserSelectedImg() {
  if (memberImgInput.files && memberImgInput.files[0]) {
    var reader = new FileReader();
    if (memberImgInput.files[0].size > 102400) {
      alert("Image too big (max 100kb)");
      return false;
    } else {
      reader.onload = function (e) {
        memberImg.src = e.target.result;
        imgValue = e.target.result;
        memberImg.classList.add("show");
        cameraImgBtn.classList.add("hide");
      };
    }

    reader.readAsDataURL(memberImgInput.files[0]);
  }
}

function updateData(e) {
  const tempInfo = JSON.parse(localStorage.getItem("personInfo"));
  imgValue = imgValue !== undefined ? imgValue : tempInfo.img;
  const updateCurrentInfo = {
    name: tempInfo.name,
    img: imgValue,
    category: tempInfo.category,
    itemNo: tempInfo.itemNo,
    d: tempInfo.date,
    m: tempInfo.month,
    y: tempInfo.year,
  };
  const checkDateOfBirth = new Date(updatedDateOfBirth.value).getTime();
  const checkCurrentDate = new Date().getTime();

  if (checkCurrentDate < checkDateOfBirth) {
    e.preventDefault();
    showError("Birth date cannot be greater than today's ");
  } else {
    memberDetails.classList.toggle("show");
    containerEl.classList.toggle("show");
    let updatedDate = updatedDateOfBirth.value.split("-")[2];
    let updatedMonth = updatedDateOfBirth.value.split("-")[1];
    let updatedYear = updatedDateOfBirth.value.split("-")[0];
    let prevName = tempInfo.name;
    let prevDate = +tempInfo.d;
    let prevMonth = +tempInfo.m;
    let prevYear = +tempInfo.y;

    updateCurrentInfo.name === ""
      ? (updateCurrentInfo.name = prevName)
      : (updateCurrentInfo.name = memberName.value);

    let fullBirthDate =
      new Date(updatedDateOfBirth.value).getDay() ||
      new Date(`${prevYear}-${prevMonth}-${prevDate}`).getDay();

    updateCurrentInfo.d = +updatedDate || prevDate;
    updateCurrentInfo.m = +updatedMonth || prevMonth;
    updateCurrentInfo.y = +updatedYear || prevYear;

    showBirthday.textContent = `${weekDays[fullBirthDate]}, ${updatedDate} ${
      month[updatedMonth - 1]
    } ${updatedYear}`;
    let checkedOptions;
    optionsEl.forEach((option) => {
      if (option.checked) {
        checkedOptions = option.dataset.event;
      }
    });

    updateCurrentInfo.category = checkedOptions;
    category.forEach((cat) => {
      cat.textContent = updateCurrentInfo.category;
    });
    title.textContent =
      checkedOptions === "anniversary" ? "Anniversary" : "Date of Birth";

    localStorage.setItem("personInfo", JSON.stringify(updateCurrentInfo));

    // Updating Outer Container

    const details = JSON.parse(localStorage.getItem("details"));
    let updateDetails = details[updateCurrentInfo.itemNo];
    const infoUpdated = details.filter((person, index) => {
      if (index === updateCurrentInfo.itemNo) {
        updateDetails.name = updateCurrentInfo.name;
        updateDetails.img = updateCurrentInfo.img;
        updateDetails.category = updateCurrentInfo.category;
        updateDetails.memberBirthDate = [
          updateCurrentInfo.y,
          updateCurrentInfo.m,
          updateCurrentInfo.d,
        ];
        updateDetails.nextBirthMonth = nextYearBirthDate(
          updateDetails.memberBirthDate
        )[0];
        updateDetails.nextBirthday = nextYearBirthDate(
          updateDetails.memberBirthDate
        )[1];
      }
      return person;
    });
    localStorage.setItem("details", JSON.stringify(infoUpdated));
  }
}
function nextYearBirthDate(memberBirth) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  let userBirthDate = +memberBirth[2];
  let userBirthMonth = +memberBirth[1];
  let userBirthYear = +memberBirth[0];

  let month = 0;
  let date = 0;
  let year = 0;
  let carry = 0;
  let carryMonths = 0;

  if (currentDate < userBirthDate) {
    carry = 1;
    date =
      currentDate +
      getDaysInMonth(currentMonth - 1, currentYear) -
      userBirthDate;
  } else {
    date = currentDate - userBirthDate;
  }

  if (currentDate === userBirthDate || currentMonth > userBirthMonth) {
    month = currentMonth - userBirthMonth - carry;
  } else if (
    currentDate < userBirthDate ||
    (currentDate > userBirthDate && currentMonth <= userBirthMonth)
  ) {
    if (!(currentDate > userBirthDate && currentMonth === userBirthMonth)) {
      carryMonths = 12;
    } else {
      carryMonths = 0;
    }
    month = currentMonth + carryMonths - userBirthMonth - carry;
  }
  if (carryMonths === 12) {
    year = currentYear - userBirthYear - 1;
  } else {
    year = currentYear - userBirthYear;
  }

  // Calculation of Next Birthday

  year < 10 ? (year = +`0${year}`) : year;
  month < 10 ? (month = +`0${month}`) : month;
  date < 10 ? (date = +`0${date}`) : date;

  let leftMonth;
  let leftDay;
  let borrow;
  if (date > 0) {
    borrow = 1;
    leftDay = getDaysInMonth(currentMonth - 1, currentYear) - +date;
  } else {
    borrow = 0;
    leftDay = `00`;
    leftMonth = `00`;
  }

  if (borrow === 1) {
    leftMonth = 12 - +month - borrow;
  } else if (month !== 0) {
    leftMonth = 12 - +month - borrow;
  } else {
    leftMonth = `00`;
  }
  if (leftMonth < 10 && leftMonth > 0) {
    leftMonth = `0${leftMonth}`;
  }
  if (leftDay < 10 && leftDay > 0) {
    leftDay = `0${leftDay}`;
  }
  let nextBirth = [leftDay, leftMonth];

  return nextBirth;
}
theme();
function theme() {
  const selectedTheme = JSON.parse(localStorage.getItem("theme"));
  document.body.classList.add(selectedTheme);
}
function showError(text) {
  const message = document.querySelector(".error");
  message.classList.add("show");
  message.innerHTML = `<p>${text} :)</p>`;
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}
