const errText = document.querySelectorAll('.error');
const inputForm = document.querySelectorAll('input');
const display = document.querySelectorAll('p');
const outputYear = document.getElementById('outputYear');
const outputMonth = document.getElementById('outputMonth');
const outputDay = document.getElementById('outputDay')


document.querySelector('.btn').addEventListener('click', () => {
    
    let day = document.querySelector("#dayInput").value;

    if (day.charAt(0) === "0") {
        day = day.substring(1);
    }

    let month = document.querySelector("#monthInput").value;

    if (month.charAt(0) === "0") {
        month = month.substring(1);
    }

    let year = document.querySelector("#yearInput").value;

    const date = new Date();
    const dayInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(day === "" || month === "" || year === ""){
        errEmpty();
    }
    else if(day > 31 || day > dayInMonth[month] || month > 12 || year > date.getFullYear()){
        errInvalid();
    }else {
        reset();
        calDate(day, month, year);
    }


})

const errEmpty = () => {
        errText.forEach(Element => {
            Element.style.color = "red";
        })
        inputForm.forEach(Element => {
            Element.style.outlineColor  = "red";
        })
        display.forEach(Element => {
            Element.innerHTML= "This field is required"
            Element.style.display = "block";
        })
}
const reset = () => {
    errText.forEach(Element => {
        Element.style.color = "";
    })
    inputForm.forEach(Element => {
        Element.style.outlineColor  = "";
    })
    display.forEach(Element => {
        Element.style.display = "none";
    })    
}
const errInvalid = () => {
        errText[0].style.color = "red"
        inputForm[0].style.outlineColor = "red";
        document.querySelector(".errDay").style.display = "block";
        document.querySelector(".errDay").innerHTML = "Must be a valid day";
        document.querySelector(".errDay").style.color = "red";
        errText[1].style.color = "red"
        inputForm[1].style.outlineColor = "red";
        document.querySelector(".errMonth").style.display = "block";
        document.querySelector(".errMonth").innerHTML = "Must be a valid month";
        document.querySelector(".errMonth").style.color = "red";
        errText[2].style.color = "red"
        inputForm[2].style.outlineColor = "red";
        document.querySelector(".errYear").style.display = "block";
        document.querySelector(".errYear").innerHTML = "Must be the past";
        document.querySelector(".errYear").style.color = "red";
}

const calDate = (day, month , year) => {
    const date = new Date();

    const todayDay= date.getDate();  
    const todayMonth= date.getMonth()+1;  
    const todayYear= date.getFullYear();  
    
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
}
