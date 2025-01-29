const leftBox = document.getElementById("prev-box-4");
const rightBox = document.getElementById("next-box-4");
const prevButton = document.getElementById("circle-prev");
const nextButton = document.getElementById("circle-next");
const reel = document.getElementById("reel-4");
const images = Array.from(document.querySelectorAll(".pic-4"));
const thumbnails = Array.from(document.querySelectorAll(".thumbnail-2"));

let moveLeft = 200;
let centerImage = 0;
let centerThumbnail = 0;
let loopValue = 0;

images[centerImage].classList.add("active");
thumbnails[centerThumbnail].classList.add("active");

function interactiveArrows() {
    if (moveLeft === 200) {
        leftBox.style.display = "none";
    }

    prevButton.addEventListener("click", () => {
        if (moveLeft >= -10) {
            leftBox.style.display = "none";
        } else if (moveLeft < -10) {
            leftBox.style.display = "flex";
        }

        if (moveLeft >= -850) {
            rightBox.style.display = "flex";
        }
    });

    nextButton.addEventListener("click", () => {
        if (moveLeft <= -640) {
            rightBox.style.display = "none";
        } else if (moveLeft > -640) {
            rightBox.style.display = "flex";
        }

        if (moveLeft <= 200) {
            leftBox.style.display = "flex";
        }
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", (event) => {
            let thumbnailIndex = thumbnails.indexOf(event.target);
            moveLeft = 200 - (thumbnailIndex * 210);
            if (moveLeft <= -10) {
                leftBox.style.display = "flex";
            } else {
                leftBox.style.display = "none";
            } 

            if (moveLeft >= -640) {
                rightBox.style.display = "flex";
            } else {
                rightBox.style.display = "none";
            }
        });
    });
};
interactiveArrows();

function buttonLoopInteraction(value) {
    if (value === 0) {
        leftBox.style.display = "none";
        rightBox.style.display = "flex";
    } else if (value > 0 && value < 5) {
        leftBox.style.display = "flex";
        rightBox.style.display = "flex";
    } else if (value === 5) {
        leftBox.style.display = "flex";
        rightBox.style.display = "none";
    }
};


function nextImage() {
    moveLeft -= 210;
    reel.style.marginLeft = `${moveLeft}px`;

    centerImage++;
    images.forEach(image => image.classList.remove("active"));
    images[centerImage].classList.add("active");

    centerThumbnail++;
    thumbnails.forEach(thumbnail => thumbnail.classList.remove("active"));
    thumbnails[centerThumbnail].classList.add("active");
};

function previousImage() {
    moveLeft += 210;
    reel.style.marginLeft = `${moveLeft}px`;

    centerImage--;
    images.forEach(image => image.classList.remove("active"));
    images[centerImage].classList.add("active");

    centerThumbnail--;
    thumbnails.forEach(thumbnail => thumbnail.classList.remove("active"));
    thumbnails[centerThumbnail].classList.add("active");
};

prevButton.addEventListener("click", () => {
    if (moveLeft < 200) {
        previousImage();
    }
});

nextButton.addEventListener("click", () => {
    if (moveLeft > -850) {
        nextImage();
    }
});

function clickAThumbnail() {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", (event) => {
            let thumbnailIndex = thumbnails.indexOf(event.target);
            moveLeft = 200 - (thumbnailIndex * 210);
            centerImage = thumbnailIndex;
            centerThumbnail = thumbnailIndex;

            reel.style.marginLeft = `${moveLeft}px`;

            images.forEach(image => image.classList.remove("active"));
            images[centerImage].classList.add("active");

            thumbnails.forEach(thumbnail => thumbnail.classList.remove("active"));
            thumbnail.classList.add("active");
        });
    });
};
clickAThumbnail();

function loop() {
    const loopIntervalId = setInterval(() => {
        loopValue++;
        console.log(`loopValue: ${loopValue}`);
        if (moveLeft <= -850) {
            moveLeft = 410;
            centerImage = -1;
            centerThumbnail = -1;
            loopValue = 0;
            console.log(`new loopValue: ${loopValue}`);
        }
        buttonLoopInteraction(loopValue);
        nextImage();
    }, 5000);

    prevButton.addEventListener("click", () => {
        clearInterval(loopIntervalId);
        loopValue = 10;
    });

    nextButton.addEventListener("click", () => {
        clearInterval(loopIntervalId);
        loopValue = 10;
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", () => {
            clearInterval(loopIntervalId);
            loopValue = 10;
        });
    });
};
loop();

/*
1st @ 200px   keep at 200px decrease by -210px
2nd @ 0px     -10px
3rd @ -200px  -220px
4th @ -400px  -430px
5th @ -600px  -640px
6th @ -800px  -850px
*/