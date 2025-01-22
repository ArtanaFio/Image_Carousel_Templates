import activePrevSVG from "../assets/images/arrow_prev_active.svg";
import activeNextSVG from "../assets/images/arrow_next_active.svg";

const leftBox = document.getElementById("prev-box-1");
const rightBox = document.getElementById("next-box-1");
const inactivePreviousButton = document.getElementById("inactive-prev");
const inactiveNextButton = document.getElementById("inactive-next");
const reel = document.getElementById("reel-1");
const circles = Array.from(document.querySelectorAll(".circle"));

const activePrevButton = document.createElement("img");
activePrevButton.src = activePrevSVG;
activePrevButton.alt = "Previous";
activePrevButton.classList.add("arrow-button-1", "active");
const activeNextButton = document.createElement("img");
activeNextButton.src = activeNextSVG;
activeNextButton.classList.add("arrow-button-1", "active");

let moveLeft = 0;
let centerCircle = 0;

circles[centerCircle].classList.add("active");

function interactiveArrows() {
    inactivePreviousButton.addEventListener("mouseover", () => {
        inactivePreviousButton.remove();
        leftBox.appendChild(activePrevButton);
    });

    activePrevButton.addEventListener("mouseleave", () => {
        activePrevButton.remove();
        leftBox.appendChild(inactivePreviousButton);
    });
    
    inactiveNextButton.addEventListener("mouseover", () => {
        inactiveNextButton.remove();
        rightBox.appendChild(activeNextButton);
    });

    activeNextButton.addEventListener("mouseleave", () => {
        activeNextButton.remove();
        rightBox.appendChild(inactiveNextButton);
    });
};
interactiveArrows();

function nextImage() {
    moveLeft -= 800;
    reel.style.marginLeft = `${moveLeft}px`;

    centerCircle++;
    circles.forEach(circle => circle.classList.remove("active"));
    circles[centerCircle].classList.add("active");
};

function previousImage() {
    moveLeft += 800;
    reel.style.marginLeft = `${moveLeft}px`;

    centerCircle--;
    circles.forEach(circle => circle.classList.remove("active"));
    circles[centerCircle].classList.add("active");
};

activeNextButton.addEventListener("click", () => {
    if (moveLeft > -3200) {
        nextImage();
    }
});

activePrevButton.addEventListener("click", () => {
    if (moveLeft < 0) {
        previousImage();
    }
});

function clickACircle() {
    circles.forEach(circle => {
        circle.addEventListener("click", (event) => {
            centerCircle = circles.indexOf(event.target);
            moveLeft = 0 - (centerCircle * 800);
            circles.forEach(circle => circle.classList.remove("active"));
            circle.classList.add("active");
            reel.style.marginLeft = `${moveLeft}px`;
        });
    });
};
clickACircle();