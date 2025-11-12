const timeInput = document.getElementById('time');
const submitBtn = document.getElementById('submit');
const mainP = document.getElementById('mainP');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const stopBtn = document.getElementById('stop');
let sound = new Audio('./shot_Clock.mp3');
let countdownInterval;
let min, sec, startMin, startSec; 

submitBtn.addEventListener('click', function () {
    const time = timeInput.value;
    const timePattern = /^(\d{1,2})\:(\d{2})$/;
    const match = time.match(timePattern);

    if (match) {
        startMin = min = parseInt(match[1]);
        startSec = sec = parseInt(match[2]);
        const formattedTime = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        mainP.textContent = formattedTime;
    } else {
        alert('Please enter the time in the format MM:SS (e.g., 15:30)');
    }
    timeInput.value = ''; 
});



function load_Sound(){
    sound = new Audio('./shot_Clock.mp3/');
}

function playSoundMultipleTimes() {
    let delay = 0; 

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            sound.play(); // Play the sound
        }, delay);

        delay += sound.duration * 1000; 
    }
}
resetBtn.addEventListener('click', function(){
    clearInterval(countdownInterval);
    min = startMin;
    sec = startSec;
    const formattedTime = `${startMin.toString().padStart(2, '0')}:${startSec.toString().padStart(2, '0')}`;
    mainP.textContent = formattedTime;
});

startBtn.addEventListener('click', function () {
    if (min === undefined || sec === undefined) {
        alert('Please enter a valid time first!');
        return;
    }

    function updateTimer() {
        if (min === 0 && sec === 1) {
            playSoundMultipleTimes();
            
        }
        if (min === 0 && sec === 0) {
            clearInterval(countdownInterval);  
            mainP.textContent = "00:00"; 
            
        } 
        else {
            if (sec === 0) {
                sec = 59;
                if (min > 0) {
                    min--;  
                }
            } else {
                sec--;  
            }
            const formattedTime = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
            mainP.textContent = formattedTime;
        }
    }
    countdownInterval = setInterval(updateTimer, 1000);
});

stopBtn.addEventListener('click', function(){
    clearInterval(countdownInterval);
});