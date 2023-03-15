let images = [{
    url: "./assets/image1slider.jpg"
}, {
    url: "./assets/image2slider.png"
}, {
    url: "./assets/image3slider.png"
}];


function initSlider(images, options) {
    if (!images || !images.length) return;

    options = options || {
        dots: false,
        autoplay: false,
        autoplayInterval: 3000
    }

    const sliderWrapper = document.querySelector(".slider");
    const sliderImages = sliderWrapper.querySelector(".slider__images");
    const sliderArrows = sliderWrapper.querySelector(".slider__arrows");

    initImages();
    initArrows();
    initlink();

    if (options.dots) {
        initDots();
    }

    if (options.autoplay) {
        initAutoplay()
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageElement = document.createElement("div");
            imageElement.className = `image n${index} ${index ? "" : "active"}`;
            imageElement.dataset.index = index;
            imageElement.style.backgroundImage = `url(${image.url})`;
            sliderImages.appendChild(imageElement);

        })
    }

    function initArrows() {
        let lastIndex = images.length - 1;
        sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
            arrow.addEventListener("click", function () {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = curNumber === 0 ? lastIndex : curNumber - 1;
                } else {
                    nextNumber = curNumber === lastIndex ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
                initActiveClass(nextNumber);
            });
        });

    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(`.n${num}`).classList.add("active");
    }


    function initDots() {
        let dotsWrapper = document.createElement("div");
        dotsWrapper.className = "slider__dots";
        images.forEach((image, index) => {
            let dot = document.createElement("div");
            dot.className = `slider__dots-item n${index} ${index ? "" : "active"}`;
            dot.dataset.index = index;
            dot.addEventListener("mousemove", function () {
                moveSlider(this.dataset.index);
                dotsWrapper.querySelector(".active").classList.remove("active");
                this.classList.add("active");
                initActiveClass(this.dataset.index);
                initlink();

            });
            dotsWrapper.appendChild(dot);

        });
        sliderWrapper.appendChild(dotsWrapper);
    }


    function initAutoplay() {
        setInterval(() => {
            let currentNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = currentNumber === images.length - 1 ? 0 : currentNumber + 1;
            moveSlider(nextNumber);

        }, options.autoplayInterval)
    }

    function initlink() {
        let lastIndex = images.length - 1;
        let linkWrapper = document.querySelector(".section2-ul");
        let linkElems = linkWrapper.querySelectorAll(".container2__item");
        linkElems.forEach(link => {
            link.addEventListener("mousemove", function () {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (link.classList.contains("one")) {
                    nextNumber = curNumber === 0 ? 0 : 0;
                } else if (link.classList.contains("two")) {
                    nextNumber = curNumber === 1 ? 1 : 1;
                } else {
                    nextNumber = curNumber === lastIndex ? lastIndex : lastIndex;
                }
                moveSlider(nextNumber);
                initActiveClass(nextNumber);
            });
        });
    };

    function initActiveClass(index) {
        document.querySelector(".slider__dots .active").classList.remove("active");
        document.querySelector(`.slider__dots .n${index}`).classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let sliderOptions = {
        dots: true,
        autoplay: false,
        autoplayInterval: 4000
    }
    initSlider(images, sliderOptions);
});