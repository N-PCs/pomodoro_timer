// variables
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');
let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');

let workTime = 25;
let breakTime = 5;
let seconds = "00";

let timerInterval;

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;
    workTittle.classList.add('active');
}

// start timer
function start() {
    // change button visibility
    startButton.style.display = "none";
    resetButton.style.display = "block";

    // change the time
    seconds = 59;
    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;
    let breakCount = 0;

    // clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // countdown
    timerInterval = setInterval(() => {
        // update display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        // decrement seconds
        seconds = seconds - 1;

        if (seconds < 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes < 0) {
                if (breakCount % 2 === 0) {
                    // start break
                    workMinutes = breakMinutes;
                    breakCount++;
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // continue work
                    workMinutes = workTime;
                    breakCount++;
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }, 1000);
}

// reset timer function
function reset() {
    clearInterval(timerInterval);
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
    startButton.style.display = "block";
    resetButton.style.display = "none";
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
}

// event listeners
startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);