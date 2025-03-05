const btn = document.getElementById("btn");
const totalP = document.getElementById("totalP");
const ambox = document.getElementById("ambox");
const tipbox = document.getElementById("tipbox");


btn.addEventListener("click", function() {
    const am = parseFloat(ambox.value);
    const tip = parseFloat(tipbox.value);

    const totalValue = am * (1 + tip / 100);
    totalP.innerText = totalValue.toFixed(2);
});