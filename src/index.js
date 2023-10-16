//  ---------
//   Sliders
//  ---------

// Declaring global variables for use in the below functions
let slider;
let cards;
let card;
let cardWidth;

let sliderPosition = 0;
let cardPosition = 0;
let isAnimating = false;

// Adding event listeners

document
  .querySelector('.best-sellers-slider_left-button')
  .addEventListener('click', bestSellersMoveLeft);
document
  .querySelector('.best-sellers-slider_right-button')
  .addEventListener('click', bestSellersMoveRight);

document.querySelector('.reviews-slider_left-button').addEventListener('click', reviewsMoveLeft);
document.querySelector('.reviews-slider_right-button').addEventListener('click', reviewsMoveRight);

// Helper functions for moveLeft() and moveRight()
function findCardWidth() {
  let cardStyle = window.getComputedStyle(card);
  let cardMarginRight = parseFloat(cardStyle.marginRight);
  cardWidth = card.offsetWidth + cardMarginRight;
}

function findSliderPosition() {
  let sliderTransformMatrix = window.getComputedStyle(slider).getPropertyValue('transform');
  let sliderTransformValues = sliderTransformMatrix.split(',');
  sliderPosition = parseFloat(sliderTransformValues[4]);
}

function findCardPosition(card) {
  let cardTransformMatrix = window.getComputedStyle(card).getPropertyValue('transform');
  let cardTransformValues = cardTransformMatrix.split(',');
  cardPosition = parseFloat(cardTransformValues[4]);
}

function finishedAnimating() {
  isAnimating = false;
}

// Assigns the global slider variables to the relevant slider's elements when that slider's left/right button is clicked
function assignVariables(sliderPrefix) {
  slider = document.querySelector('.' + sliderPrefix + '-slider_wrapper');
  cards = document.querySelectorAll('.' + sliderPrefix + '-slider_card');
  card = document.querySelector('.' + sliderPrefix + '-slider_card');
}

// Basic move right function for all sliders
function moveRight() {
  findCardWidth();

  slider.insertBefore(slider.firstElementChild, slider.lastElementChild.nextSibling);

  findSliderPosition();
  slider.style.transform = `translateX(${sliderPosition + cardWidth}px)`;

  cards.forEach((card) => {
    findCardPosition(card);
    card.style.transform = `translateX(${cardPosition - cardWidth}px)`;
  });

  setTimeout(finishedAnimating, 500);
}

// Basic move left function for all sliders
function moveLeft() {
  findCardWidth();

  slider.insertBefore(slider.lastElementChild, slider.firstElementChild);

  findSliderPosition();
  slider.style.transform = `translateX(${sliderPosition - cardWidth}px)`;

  cards.forEach((card) => {
    findCardPosition(card);
    card.style.transform = `translateX(${cardPosition + cardWidth}px)`;
  });

  setTimeout(finishedAnimating, 500);
}

// Best Sellers Slider's left button
function bestSellersMoveLeft() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('best-sellers');
    moveLeft();
  }
}

// Best Sellers Slider's right button
function bestSellersMoveRight() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('best-sellers');
    moveRight();
  }
}

// Reviews Slider's left button
function reviewsMoveLeft() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('reviews');
    moveLeft();
  }
}

// Review Slider's right button
function reviewsMoveRight() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('reviews');
    moveRight();
  }
}

// Mobile IG Slider's left button
function igPostsMoveLeft() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('ig-posts');
    moveLeft();
    dotNumberDecrease();
    updateDots();
  }
}

// Mobile IG Slider's right button
function igPostsMoveRight() {
  if (isAnimating === false) {
    isAnimating = true;

    assignVariables('ig-posts');
    moveRight();
    dotNumberIncrease();
    updateDots();
  }
}

// Updating the IG slider's dots
var dotNumber = 1;

function dotNumberIncrease() {
  dotNumber += 1;
  if (dotNumber >= 5) {
    dotNumber = 1;
  }
}

function dotNumberDecrease() {
  dotNumber -= 1;
  if (dotNumber <= 0) {
    dotNumber = 4;
  }
}

function updateDots() {
  var dot1 = document.querySelector('#ig-posts-slider-dot-1');
  var dot2 = document.querySelector('#ig-posts-slider-dot-2');
  var dot3 = document.querySelector('#ig-posts-slider-dot-3');
  var dot4 = document.querySelector('#ig-posts-slider-dot-4');

  if (dotNumber === 1) {
    dot1.classList.add('is-selected');
    dot2.classList.remove('is-selected');
    dot3.classList.remove('is-selected');
    dot4.classList.remove('is-selected');
  } else if (dotNumber === 2) {
    dot2.classList.add('is-selected');
    dot1.classList.remove('is-selected');
    dot3.classList.remove('is-selected');
    dot4.classList.remove('is-selected');
  } else if (dotNumber === 3) {
    dot3.classList.add('is-selected');
    dot1.classList.remove('is-selected');
    dot2.classList.remove('is-selected');
    dot4.classList.remove('is-selected');
  } else if (dotNumber === 4) {
    dot4.classList.add('is-selected');
    dot1.classList.remove('is-selected');
    dot2.classList.remove('is-selected');
    dot3.classList.remove('is-selected');
  }
}

// Puts the Reviews slider back into place when the user resizes the window
window.addEventListener('resize', function () {
  assignVariables('reviews');
  findCardWidth();
  cards.forEach((card) => {
    card.style.transition = 'none';
    findCardPosition(card);
    card.style.transform = `translateX(${-(cardWidth * 2)}px)`;
    setTimeout(() => {
      card.style.transition = 'transform 0.5s ease';
    }, 500);
  });
  slider.style.transform = `translateX(0px)`;
});

// Touch screen Swipe Support

function addSwipeInteraction(swipeArea) {
  var startCoordinates = {};
  var isSwiping = false; // Variable to track whether a swipe is in progress

  swipeArea.addEventListener('touchstart', function (event) {
    startCoordinates.x = event.touches[0].clientX;
    startCoordinates.y = event.touches[0].clientY;
    isSwiping = false; // Initialize isSwiping to false
  });

  swipeArea.addEventListener('touchmove', function (event) {
    var deltaX = event.touches[0].clientX - startCoordinates.x;
    var deltaY = event.touches[0].clientY - startCoordinates.y;

    // Check if the swipe is more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      event.preventDefault(); // Prevent scrolling while swiping horizontally
      isSwiping = true; // Set isSwiping to true when a horizontal swipe is detected
    }
  });

  swipeArea.addEventListener('touchend', function (event) {
    if (isSwiping) {
      // Check if a horizontal swipe was detected
      var deltaX = event.changedTouches[0].clientX - startCoordinates.x;

      if (deltaX > 0) {
        // Right swipe
        if (swipeArea === bestSellersSwipeArea) {
          bestSellersMoveLeft();
        } else if (swipeArea === reviewsSwipeArea) {
          reviewsMoveLeft();
        } else if (swipeArea === igPostsSwipeArea) {
          igPostsMoveLeft();
        }
      } else {
        // Left swipe
        if (swipeArea === bestSellersSwipeArea) {
          bestSellersMoveRight();
        } else if (swipeArea === reviewsSwipeArea) {
          reviewsMoveRight();
        } else if (swipeArea === igPostsSwipeArea) {
          igPostsMoveRight();
        }
      }
    }
  });
}

var bestSellersSwipeArea = document.getElementById('best-sellers-swipe-area');
addSwipeInteraction(bestSellersSwipeArea);

var reviewsSwipeArea = document.getElementById('reviews-swipe-area');
addSwipeInteraction(reviewsSwipeArea);

var igPostsSwipeArea = document.getElementById('ig-posts-swipe-area');
addSwipeInteraction(igPostsSwipeArea);

//  ------------------------
//   Categories Interaction
//  ------------------------

document.addEventListener('DOMContentLoaded', function () {
  const flannelShirtsLink = document.querySelector('#flannel-shirts-link');
  const flannelShirtsLabel = document.querySelector('#flannel-shirts-label');
  const flannelShirtsUnderlay = document.querySelector('.is-flannel-shirts');

  const tShirtsLink = document.querySelector('#t-shirts-link');
  const tShirtsLabel = document.querySelector('#t-shirts-label');
  const tShirtsUnderlay = document.querySelector('.is-t-shirts');

  const coatsLink = document.querySelector('#coats-link');
  const coatsLabel = document.querySelector('#coats-label');
  const coatsUnderlay = document.querySelector('.is-coats');

  const jacketsLink = document.querySelector('#jackets-link');
  const jacketsLabel = document.querySelector('#jackets-label');
  const jacketsUnderlay = document.querySelector('.is-jackets');

  // Defining the interactions
  function categoryHover(label, underlay) {
    label.style.transform = `translateX(25px)`;
    underlay.style.opacity = '1';
  }

  function categoryReset(label, underlay) {
    label.style.transform = `translateX(0px)`;
    underlay.style.opacity = '0';
  }

  // Adding Event Listeners to each category link block
  flannelShirtsLink.addEventListener('mouseover', () => {
    categoryHover(flannelShirtsLabel, flannelShirtsUnderlay);
  });
  flannelShirtsLink.addEventListener('mouseout', () => {
    categoryReset(flannelShirtsLabel, flannelShirtsUnderlay);
  });

  tShirtsLink.addEventListener('mouseover', () => {
    categoryHover(tShirtsLabel, tShirtsUnderlay);
  });
  tShirtsLink.addEventListener('mouseout', () => {
    categoryReset(tShirtsLabel, tShirtsUnderlay);
  });

  coatsLink.addEventListener('mouseover', () => {
    categoryHover(coatsLabel, coatsUnderlay);
  });
  coatsLink.addEventListener('mouseout', () => {
    categoryReset(coatsLabel, coatsUnderlay);
  });

  jacketsLink.addEventListener('mouseover', () => {
    categoryHover(jacketsLabel, jacketsUnderlay);
  });
  jacketsLink.addEventListener('mouseout', () => {
    categoryReset(jacketsLabel, jacketsUnderlay);
  });
});

//  ------------------------
//   Footer Accordian Menu
//  ------------------------

// Get all elements with the attribute fs-accordion-element="arrow"
const arrowElements = document.querySelectorAll('[fs-accordion-element="arrow"]');

// Create a MutationObserver for each element
arrowElements.forEach((arrowElement) => {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (arrowElement.classList.contains('is-active-accordion')) {
          // Find and set the opacity of the child element with fs-accordion-element="horizontal-line"
          const horizontalLine = arrowElement.querySelector(
            '[fs-accordion-element="horizontal-line"]'
          );
          if (horizontalLine) {
            horizontalLine.style.opacity = 0;
          }
        } else {
          // Reset the opacity when is-active-accordion is removed
          const horizontalLine = arrowElement.querySelector(
            '[fs-accordion-element="horizontal-line"]'
          );
          if (horizontalLine) {
            horizontalLine.style.opacity = 1;
          }
        }
      }
    }
  });

  // Define the configuration for the MutationObserver
  const config = { attributes: true, attributeFilter: ['class'] };

  // Start observing each target element
  observer.observe(arrowElement, config);
});
