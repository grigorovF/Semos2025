
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".text > div");
    const circles = document.querySelectorAll(".circle");

    let currentIndex = 0;

    function moveCircle(circleId) {
        let newIndex;
        if (circleId === 'circle1') newIndex = 0;
        if (circleId === 'circle2') newIndex = 1;
        if (circleId === 'circle3') newIndex = 2;

        if (newIndex === currentIndex) return;    
        circles.forEach(c => c.classList.remove("clicked"));
        document.getElementById(circleId).classList.add("clicked");
       
        sections.forEach((section, index) => {
            if (index === newIndex) {
                section.style.display = "block";
                section.style.animation = "slideIn 0.5s ease forwards";
            } else {
                section.style.display = "none";
            }
    
    });
        currentIndex = newIndex;
    }

    circles.forEach((circle, index) => {
        circle.addEventListener("click", function () {
            moveCircle(circle.id);
            currentIndex = index;
        });
    });

circles[currentIndex].classList.add("clicked");
});