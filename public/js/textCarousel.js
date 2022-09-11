const textCarousel = document.getElementById("text-carousel")
const carouselWords = ['tracked', 'automated', 'simplified']

//https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
//Styling transitions: https://stackoverflow.com/questions/55257914/how-to-change-text-animation-using-setinterval-and-styling-by-css
function setIntervalX(delay, repetitions) {
    let count = 0;
    const intervalID = window.setInterval(function () {

    textCarousel.innerText = carouselWords[count]
       if (++count === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}

// This will be repeated 3 times with 2 second intervals:
setIntervalX(2000, carouselWords.length);

// let count = 0
// function cycleText() {
//     textCarousel.innerText = carouselWords[count]
//     count++
//     if (count === carouselWords.length) {
//         count = 0;
//     }
// }

// setInterval(cycleText, 3000);