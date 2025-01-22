import purplePrevSVG from "../assets/images/arrow_prev_purple.svg";
import purpleNextSVG from "../assets/images/arrow_next_purple.svg";

const leftBox = document.getElementById("prev-box-2");
const rightBox = document.getElementById("next-box-2");
const yellowPrevButton = document.getElementById("yellow-prev");
const yellowNextButton = document.getElementById("yellow-next");
const reel = document.getElementById("reel-2");
const images = Array.from(document.querySelectorAll(".pic-2"));
const dots = Array.from(document.querySelectorAll(".dot"));

const purplePrevButton = document.createElement("img");
purplePrevButton.src = purplePrevSVG;
purplePrevButton.alt = "Previous";
purplePrevButton.classList.add("arrow-button-2", "active");
const purpleNextButton = document.createElement("img");
purpleNextButton.src = purpleNextSVG;
purpleNextButton.classList.add("arrow-button-2", "active");

let moveLeft = 400;
let centerImage = 0;
let centerDot = 0;

images[centerImage].classList.add("active");
dots[centerDot].classList.add("active");

function interactiveArrows() {
    yellowPrevButton.addEventListener("mouseover", () => {
        if (moveLeft < 400) {
            yellowPrevButton.remove();
            leftBox.appendChild(purplePrevButton);
        }
    });

    purplePrevButton.addEventListener("mouseleave", () => {
        purplePrevButton.remove();
        leftBox.appendChild(yellowPrevButton);
    });

    purplePrevButton.addEventListener("click", () => {
        if (moveLeft === 0) {
            purplePrevButton.remove();
            leftBox.appendChild(yellowPrevButton);
        }
    });
   
    yellowNextButton.addEventListener("mouseover", () => {
        if (moveLeft > -1600) {
            yellowNextButton.remove();
            rightBox.appendChild(purpleNextButton);
        }
    });

    purpleNextButton.addEventListener("mouseleave", () => {
        purpleNextButton.remove();
        rightBox.appendChild(yellowNextButton);
    });

    purpleNextButton.addEventListener("click", () => {
        if (moveLeft === -1200) {
            purpleNextButton.remove();
            rightBox.appendChild(yellowNextButton);
        }
    });
};
interactiveArrows();

function nextImage() {
    moveLeft -= 400;
    reel.style.marginLeft = `${moveLeft}px`;
        
    centerImage++;
    images.forEach(image => image.classList.remove("active"));
    images[centerImage].classList.add("active");
        
    centerDot++;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[centerDot].classList.add("active");
};

function previousImage() {
    moveLeft += 400;
    reel.style.marginLeft = `${moveLeft}px`;

    centerImage--;
    images.forEach(image => image.classList.remove("active"));
    images[centerImage].classList.add("active");
    
    centerDot--;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[centerDot].classList.add("active");
};

purpleNextButton.addEventListener("click", () => {
    clearInterval(autoIntervalId);
    if (moveLeft > -1600) {
        nextImage();
    }
});

purplePrevButton.addEventListener("click", () => {
    clearInterval(autoIntervalId);
    if (moveLeft < 400) {
        previousImage();
    }
});

function clickADot() {
    dots.forEach(dot => {
        dot.addEventListener("click", (event) => {
            clearInterval(autoIntervalId);
            let dotIndex = dots.indexOf(event.target);
            moveLeft = 400 - (dotIndex * 400);
            centerImage = dotIndex;
            centerDot = dotIndex;

            reel.style.marginLeft = `${moveLeft}px`;

            images.forEach(image => image.classList.remove("active"));
            images[centerImage].classList.add("active");

            dots.forEach(dot => dot.classList.remove("active"));
            dot.classList.add("active");
        });
    });
};
clickADot();

const autoIntervalId = setInterval(() => {
    if (moveLeft <= -1600) {
        clearInterval(autoIntervalId);
    } else {
        nextImage();
    }
}, 5000);

/*
left margin:
1st @ 400px
2st @ 0px
3rd @ -400px
4th @ -800px
5th @ -1200px
6th @ -1600px
*/