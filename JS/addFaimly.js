// *************************************
// *********** Add Family & Friends **********
// *************************************

// Element Selectors
const memberDetails = document.querySelector(".member-details");
const addMember = document.querySelector(".add-member");

// Element Selecotors for Save & Cancel Button
const saveBtn = document.getElementById("save");
const cancelBtn = document.getElementById("cancel");

// Element Selecotors for Date of Birth, Name & Radio Button
const dateOfBirth = document.getElementById("dateOfBirth");
const memberName = document.getElementById("name");
const optionsEl = document.querySelectorAll(".options");

// Element Selecotors for Add Members as child
const allMembers = document.querySelector(".all-members");

const memberImgInput = document.getElementById("memberImg");
const imgBtn = document.querySelector(".camera-container");
// const imgBtn = document.getElementById("chooseFile");
const cameraImgBtn = document.querySelector(".img");
const memberImg = document.getElementById("img");
const message = document.querySelectorAll(".message");

let optionChecked;

let memberBirth;

// EventListeners
imgBtn.addEventListener("click", () => {
  memberImgInput.value = "";
  memberImgInput.click();
});

let imgValue;
memberImgInput.addEventListener("change", () => {
  getUserSelectedImg();
});

window.addEventListener("DOMContentLoaded", () => {
  allMember();
  optionsEl.forEach((option) =>
    option.addEventListener("click", () => {
      optionsEl.forEach((value) => value.removeAttribute("checked"));
      option.setAttribute("checked", true);
    })
  );
});

const containerEl = document.querySelector(".container");
addMember.addEventListener("click", () => {
  memberDetails.classList.toggle("show");
  addMember.classList.toggle("hide");
  containerEl.classList.toggle("show");
});

saveBtn.addEventListener("click", (e) => {
  memberInformation();
  e.preventDefault();
  if (memberBirth) {
    updatedData();
    const persons = {
      img: imgValue,
      name: memberName.value,
      category: optionChecked,
      memberBirthDate: memberBirth,
      nextBirthMonth: nextYearBirthDate(memberBirth)[1],
      nextBirthday: nextYearBirthDate(memberBirth)[0],
    };

    const {
      img,
      name,
      category,
      memberBirthDate,
      nextBirthMonth,
      nextBirthday,
    } = persons;

    if (
      img === undefined ||
      (img &&
        name &&
        category &&
        memberBirthDate &&
        nextBirthMonth &&
        nextBirthday)
    ) {
      const details = JSON.parse(localStorage.getItem("details")) || [];
      details.push(persons);
      localStorage.setItem("details", JSON.stringify(details));
    }
  }
});

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearData();
});

// Functions

function updatedData() {
  const tempInfo = JSON.parse(localStorage.getItem("personInfo"));
  const details = JSON.parse(localStorage.getItem("details"));
  let updateDetails = details[tempInfo.itemNo];
  const infoUpdated = details.filter((person, index) => {
    if (index === tempInfo.itemNo) {
      updateDetails.name = tempInfo.name;
      updateDetails.img = tempInfo.img;
      updateDetails.category = tempInfo.category;
      updateDetails.memberBirthDate = [tempInfo.y, tempInfo.m, tempInfo.d];
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

function memberInformation() {
  optionsEl.forEach((option) => {
    if (option.getAttribute("checked")) {
      optionChecked = option.dataset.event;
    }
  });
  if (dateOfBirth.value === "") {
    message[0].classList.add("error");
    message[1].classList.remove("error");
    message[2].classList.remove("error");
  } else if (memberName.value === "") {
    message[1].classList.add("error");
    message[0].classList.remove("error");
    message[2].classList.remove("error");
  } else if (optionChecked === undefined) {
    message[2].classList.add("error");
    message[0].classList.remove("error");
    message[1].classList.remove("error");
  } else {
    memberBirth = dateOfBirth.value.split("-");
    addMembers(memberName.value, optionChecked, memberBirth, imgValue);
    clearData();
  }
}

function clearData() {
  containerEl.classList.toggle("show");
  memberDetails.classList.toggle("show");
  addMember.classList.toggle("hide");

  setTimeout(() => {
    dateOfBirth.value = "";
    memberName.value = "";
    optionsEl.forEach((option) => {
      option.checked = false;
    });
    // from img reset
    memberImg.classList.remove("show");
    cameraImgBtn.classList.remove("hide");
  }, 1000);
}

function addMembers(name, option, memberBirth, img) {
  let createDiv = document.createElement("div");
  img === undefined ? (img = `./images/man.png`) : img;
  createDiv.classList.add("item");
  createDiv.innerHTML = `
  <a href="person-details.html" class="member">
  <img src="${img}" alt="img" class="user-img" />
  <div>
  <p class="member-name">${name}</p>
  <p class="birthday" data-category=${option} data-date=${
    memberBirth[2]
  } data-month=${memberBirth[1]} data-year=${memberBirth[0]}>${option}: ${
    memberBirth[2]
  }-${memberBirth[1]}-${memberBirth[0]}</p>
  <p class="nextBirthday">Next ${option}: <span id="months"> ${
    nextYearBirthDate(memberBirth)[1]
  } </span> Months <span id="days"> ${
    nextYearBirthDate(memberBirth)[0]
  } </span> Days</p>
  </div>
  <i class="fa-solid fa-angle-right enter-icon"></i>
  </a>`;

  allMembers.appendChild(createDiv);

  const items = document.querySelectorAll(".item");
  const noPerson = document.querySelector(".no-persons");
  if (items) {
    noPerson.classList.add("hide");
  } else {
    noPerson.classList.remove("hide");
  }
}

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
var getDaysInMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
};
getLocalStorage();

function getLocalStorage() {
  const personDetials = JSON.parse(localStorage.getItem("details"));
  if (personDetials) {
    personDetials.forEach((person) => {
      addMembers(
        person.name,
        person.category,
        person.memberBirthDate,
        person.img
      );
    });
  }
}

function allMember() {
  const allItems = document.querySelectorAll(".item");
  allItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const info = JSON.parse(localStorage.getItem("personInfo"));
      if (info) {
        localStorage.removeItem("personInfo");
      }
      const img = document.querySelectorAll(".user-img")[index].src;
      const name = document.querySelectorAll(".member-name")[index].innerText;
      const date = document.querySelectorAll(".birthday")[index].dataset.date;
      const month = document.querySelectorAll(".birthday")[index].dataset.month;
      const year = document.querySelectorAll(".birthday")[index].dataset.year;
      const category =
        document.querySelectorAll(".birthday")[index].dataset.category;
      const personInfo = {
        name: name,
        img: img,
        d: +date,
        m: +month,
        y: +year,
        category: category,
        itemNo: index,
      };
      localStorage.setItem("personInfo", JSON.stringify(personInfo));
    });
  });
}
theme();
function theme() {
  const selectedTheme = JSON.parse(localStorage.getItem("theme"));
  document.body.classList.add(selectedTheme);
}
