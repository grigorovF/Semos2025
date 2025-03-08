var rock = String.fromCodePoint(0x1F44A);
var paper = String.fromCodePoint(0x1f590);
var scissors = String.fromCodePoint(0x270c);

var choices = [rock, paper, scissors];

const userResult = document.getElementById('userResult');
const computerResult = document.getElementById('computerResult');
const wonSpan = document.getElementById('wonSpan');
const finalSpan = document.getElementById('finalSpan');
var userWin = 0;
var comWin = 0;


const playBtn = document.getElementById('playBtn');

playBtn.addEventListener('click', function(){

    var userIndex = Math.floor(Math.random() * choices.length);
    var comIndex = Math.floor(Math.random() * choices.length);


    var userChoice = choices[userIndex];
    var computerChoice = choices[comIndex];

    userResult.innerText = "User " + userChoice + " - ";
    computerResult.innerText = computerChoice + " Computer";
    
    if (userChoice === computerChoice)
        wonSpan.innerText = 'TIE';
    if ((userChoice === paper && computerChoice == rock) ||
        (userChoice === rock && computerChoice == scissors) ||
        (userChoice === scissors && computerChoice == paper)){
            wonSpan.innerText = 'User Win!';
            userWin++;
        }
    else if ((computerChoice === paper && userChoice == rock) ||
            (computerChoice === rock && userChoice == scissors) ||
            (computerChoice === scissors && userChoice == paper)){
                wonSpan.innerText = "Computer Win!";
                comWin++;
            }
    finalSpan.innerHTML = "Result: " + userWin.toString() + " - " + comWin.toString();
});
