const button = document.getElementById("roll-button");
const dice = document.getElementById("dice");
const rollHistory = document.getElementById("roll-history");
const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

let historyList = [];

button.addEventListener("click", () => {
    dice.classList.add("roll-animation");
    setTimeout(() => {
      dice.classList.remove("roll-animation");
      rollDice();
    }, 500);
});

function rollDice() {
    const rollResult = Math.floor(Math.random()*6 + 1);
    const diceFace = diceFaces[rollResult - 1];
    dice.innerHTML = diceFace;
    historyList.push(rollResult);
    updateRollHistory();
}

function updateRollHistory() {
  rollHistory.innerHTML = "";
  historyList.forEach((roll, index) => {
      const listItem = document.createElement("li");
      const diceFace = diceFaces[roll - 1]; 
      listItem.innerHTML = `Roll ${index + 1}: <span>${diceFace}</span>`;
      rollHistory.appendChild(listItem);
  });

}

