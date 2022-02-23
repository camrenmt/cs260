// Calendar Code courtesy of https://www.codewrites.com/2021/07/how-to-create-dynamic-calendar-in-html.html
// with adjustments to design and functionality

let day_curr = null;
let month_curr = null;
let year_curr = null;
let current_day = null;
let response = null;

let dt = new Date();
 function renderDate() {
    dt.setDate(1);

    let day = dt.getDay();
    let today = new Date();
    current_day = today;
    let endDate = new Date( dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    let prevDate = new Date( dt.getFullYear(), dt.getMonth(), 0).getDate();

    let months = [
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
    "December"
    ]

    document.getElementById("month").innerHTML = months[dt.getMonth()];
 
    day_curr = today.getDate();
    month_curr = (today.getMonth() + 1);
    year_curr = today.getFullYear();
 
    let cells = "";
    for (x = day; x > 0; x--) {
        cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
    }

    function updateDay(selected_day) {
        document.getElementById("date_str").innerHTML = selected_day.toDateString();
        document.getElementById("day-title").innerHTML = selected_day.toDateString();
        current_day = selected_day;
        getHoliday();
    }

    for (i = 1; i <= endDate; i++) {
        if (i == today.getDate() && dt.getMonth() == today.getMonth()) {
            cells += "<div class='day today'>" + i + "</div>";
            updateDay(today);
        } else cells += "<div class='day'>" + i + "</div>";
    }
        
    document.getElementsByClassName("days")[0].innerHTML = cells;

    document.querySelectorAll(".day").forEach((element) => {
        element.addEventListener('click', (e) => {
            curr = document.getElementsByClassName('today')[0]
            curr.classList.remove('today')
            diff = element.innerText - curr.innerText
            element.classList.add('today')

            newDay = new Date();
            newDay.setDate(current_day.getDate() + diff);
            updateDay(newDay);
        });
    });

}

function getHoliday() {
    const axios = require('axios');

    axios.get('https://api.getfestivo.com/v2/holidays', {
        params: {
        api_key: "e7c94380-c578-47bb-8b55-89e11c8b4664",
        country: "US",
        year: year_curr
        }
    })
    .then(function (response) {
        // handle success
        console.log(response)
    })
    .catch(function (error) {
        // handle error
        console.log(error)
    })
    .then(function () {
        // always executed
    })
}


function moveDate(para) {
    if(para == "prev") { 
        dt.setMonth(dt.getMonth() - 1); 
    } 
    else if(para == 'next') {
        dt.setMonth(dt.getMonth() + 1);
    }
    renderDate();
 }
