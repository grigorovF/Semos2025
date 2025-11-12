const sideList = document.querySelector('.side-list');
const navList = document.querySelector('.nav-list');  

window.onload = function() {
    sideList.style.display = "none"; 
}
window.addEventListener('resize', function() {
    if (window.innerWidth > 900 && sideList.style.display === "flex") {
        sideList.style.display = "none";  
    }
});
function toggle() {
    if (sideList.style.display === "none" || sideList.style.display === "") {
        sideList.style.display = "flex";  // Show side list
    } else {
        sideList.style.display = "none";  // Hide side list
    }
}