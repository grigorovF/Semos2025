// Background Slideshow

const main = document.getElementById("items");
const lines = document.querySelectorAll(".lines");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const timerDisplay = document.getElementById("time");

const backgrounds = [
  "url('img/nike-pegasus-41-21635997-main.webp')",
  "url('img/12.webp')",
  "url('img/nike1.webp')",
  "url('img/sp1pwv9merjbj5wa1kch.jpg')"
];

let index = 0;
let timeLeft = 5;
let timerInterval;
let slideInterval;

function updateLines() {
  lines.forEach((line, i) => {
    if (i === index) {
      line.classList.add('active', 'line-color'); 
    } else {
      line.classList.remove('active', 'line-color');
    }
  });
}

function changeBackground() {
  main.style.backgroundImage = backgrounds[index];
  main.style.transition = "background-image 1s ease-in-out";
  updateLines();
}

function nextSlide() {
  index = (index + 1) % backgrounds.length;
  restartSlideshow();
}

function prevSlide() {
  index = (index - 1 + backgrounds.length) % backgrounds.length;
  restartSlideshow();
}

function startSlideshow() {
  clearInterval(slideInterval);
  clearInterval(timerInterval);

  timeLeft = 5;
  timerDisplay.textContent = timeLeft;

  changeBackground();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      nextSlide();
    }
  }, 1000);

  slideInterval = setInterval(nextSlide, 5000);
}

function restartSlideshow() {
  clearInterval(slideInterval);
  clearInterval(timerInterval);
  startSlideshow();
}

left.addEventListener("click", prevSlide);
right.addEventListener("click", nextSlide);

changeBackground();
updateLines();
startSlideshow();


//search-togle
function toggleSearchInput() {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;

  if (window.innerWidth <= 990) {
    searchInput.style.display = "none";
  } else {
    searchInput.style.display = "flex";
  }
}

window.addEventListener('load', toggleSearchInput);
window.addEventListener('resize', toggleSearchInput);


//show sideList
function showSideList() {
  const sideList = document.getElementById("side-list");
  if (sideList.style.display === "" || sideList.style.display === "none") {
    sideList.style.display = "flex";
  } else {
    sideList.style.display = "none";
  }
}

//show headerList
function showHeaderList() {
  const headerList = document.getElementById("main-nav-side");
  if (headerList.style.display === "" || headerList.style.display === "none") {
    headerList.style.display = "flex";
  } else {
    headerList.style.display = "none";
  }
}

//lists
const menuItems = document.querySelectorAll('.main-nav li');
const lists = document.querySelectorAll('.lists-main > div');

menuItems.forEach((item, index) => {
  item.addEventListener('mouseenter', () => {
    lists.forEach(list => list.style.display = 'none');
    lists[index].style.display = 'flex';
  });

  item.addEventListener('mouseleave', () => {
    lists[index].style.display = 'none';
  });
});
