const leftBox = document.getElementById("prev-box-3");
const rightBox = document.getElementById("next-box-3");
const prevButton = document.getElementById("gray-prev");
const nextButton = document.getElementById("gray-next");
const reel = document.getElementById("reel-3");
const images = Array.from(document.querySelectorAll(".pic-3"));
const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));

let moveLeft = 200;
let centerImage = 0;
let centerThumbnail = 0;

images[centerImage].classList.add("active");
thumbnails[centerThumbnail].classList.add("active");

function interactiveArrows() {

    if (moveLeft === 200) {
        leftBox.style.display = "none";
    }

    prevButton.addEventListener("click", () => {
        if (moveLeft >= -10) {
            leftBox.style.display = "none";
        } else {
            leftBox.style.display = "flex";
        }

        if (moveLeft >= -640) {
            rightBox.style.display = "flex";
        }
    });

    nextButton.addEventListener("click", () => {
        if (moveLeft <= -430) {
            rightBox.style.display = "none";
        } else {
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

            if (moveLeft >= -430) {
                rightBox.style.display = "flex";
            } else {
                rightBox.style.display = "none";
            }
        });
    });
};
interactiveArrows();

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
    if (moveLeft > -640) {
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