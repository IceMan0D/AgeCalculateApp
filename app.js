const errText = document.querySelectorAll(".error");
const inputForm = document.querySelectorAll("input");
const display = document.querySelectorAll("p");
const outputYear = document.getElementById("outputYear");
const outputMonth = document.getElementById("outputMonth");
const outputDay = document.getElementById("outputDay");

const date = new Date();

document.querySelector(".btn").addEventListener("click", () => {
  let day = document.querySelector("#dayInput").value;
  let month = document.querySelector("#monthInput").value;
  let year = document.querySelector("#yearInput").value;
  const dayInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day.charAt(0) === "0") {
    day = day.substring(1);
  }
  if (month.charAt(0) === "0") {
    month = month.substring(1);
  }

  if (day === "" || month === "" || year === "") {
    if (!day) {
      errEmpty(1);
    }
    if (!month) {
      errEmpty(2);
    }
    if (!year) {
      errEmpty(3);
    }
  } else if (
    day > 31 ||
    day > dayInMonth[month] ||
    month > 12 ||
    year > date.getFullYear()
  ) {
    if (day > 31 || day > dayInMonth[month]) {
      errInvalid(1);
    }
    if (month > 12) {
      errInvalid(2);
    }
    if (year > date.getFullYear()) {
      errInvalid(3);
    }
  } else {
    reset();
    calDate(day, month, year); // คำนวณ
  }
});

const fieldErrors = [
  { field: inputForm[0], textElement: errText[0], displayElement: display[0] },
  { field: inputForm[1], textElement: errText[1], displayElement: display[1] },
  { field: inputForm[2], textElement: errText[2], displayElement: display[2] },
];

const errEmpty = (num) => {
  fieldErrors[num - 1].textElement.style.color = "red";
  fieldErrors[num - 1].field.style.outlineColor = "red";
  fieldErrors[num - 1].displayElement.innerHTML = "This field is required";
  fieldErrors[num - 1].displayElement.style.display = "block";
};

const reset = () => {
  errText.forEach((Element) => {
    Element.style.color = "";
  });
  inputForm.forEach((Element) => {
    Element.style.outlineColor = "";
  });
  display.forEach((Element) => {
    Element.style.display = "none";
  });
};

const errInvalid = (num) => {
  if (num == 1) {
    errText[0].style.color = "red";
    inputForm[0].style.outlineColor = "red";
    document.querySelector(".errDay").style.display = "block";
    document.querySelector(".errDay").innerHTML = "Must be a valid day";
    document.querySelector(".errDay").style.color = "red";
  }
  if (num == 2) {
    errText[1].style.color = "red";
    inputForm[1].style.outlineColor = "red";
    document.querySelector(".errMonth").style.display = "block";
    document.querySelector(".errMonth").innerHTML = "Must be a valid month";
    document.querySelector(".errMonth").style.color = "red";
  }
  if (num == 3) {
    errText[2].style.color = "red";
    inputForm[2].style.outlineColor = "red";
    document.querySelector(".errYear").style.display = "block";
    document.querySelector(".errYear").innerHTML = "Must be the past";
    document.querySelector(".errYear").style.color = "red";
  }
};

const calDate = (day, month, year) => {
  const todayDay = date.getDate();
  const todayMonth = date.getMonth() + 1;
  const todayYear = date.getFullYear();

  let days = todayDay - day;
  let months = todayMonth - month;
  let years = todayYear - year;

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    var lastMonthDate = new Date(todayDay, todayMonth, 0).getDate();
    days += lastMonthDate;
    months--;
  }

  outputYear.innerHTML = years;
  outputMonth.innerHTML = months;
  outputDay.innerHTML = days;
};
