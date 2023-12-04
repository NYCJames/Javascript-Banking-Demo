'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (value, key) {
  // console.log(value, key);
  value.addEventListener(`click`, openModal);
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  } else if (e.key === `ArrowLeft`) {
    previousSlide();
  } else if (e.key === `ArrowRight`) {
    nextSlide();
  }
});

// console.log(Number.parseFloat(`3543osajd`) + 1000);

// Learn more
const btnLearnMore = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

btnLearnMore.addEventListener(`click`, function () {
  section1.scrollIntoView({ behavior: `smooth` });
});

// Scrolling navigation buttons
// document.querySelectorAll(`.nav__link`).forEach(function (element) {
//   element.addEventListener(`click`, function (event) {
//     event.preventDefault();

//     const scrollTo = this.getAttribute(`href`);
//     document.querySelector(scrollTo).scrollIntoView({ behavior: `smooth` });
//   });
// });

document
  .querySelector(`.nav__links`)
  .addEventListener(`click`, function (event) {
    event.preventDefault();

    if (
      event.target.classList.contains(`nav__link`) &&
      event.target.getAttribute(`href`) !== `#`
    ) {
      console.log(event.target.getAttribute(`href`));
      document
        .querySelector(event.target.getAttribute(`href`))
        .scrollIntoView({ behavior: `smooth` });
    }

    // console.log(event.currentTarget);
  });

// Operations Tabs
const operationsTabs = document.querySelectorAll(`.operations__tab`);
const operationsTabsContainer = document.querySelector(
  `.operations__tab-container`
);
const operationsTabContents = document.querySelectorAll(`.operations__content`);

operationsTabsContainer.addEventListener(`click`, function (event) {
  const clicked = event.target.closest(`.operations__tab`);
  // console.log(clicked);

  if (!clicked) return;

  operationsTabs.forEach(function (tab) {
    tab.classList.remove(`operations__tab--active`);
  });
  clicked.classList.add(`operations__tab--active`);

  console.log(`${clicked.getAttribute(`data-tab`)} OR ${clicked.dataset.tab}`);
  operationsTabContents.forEach(function (content) {
    content.classList.remove(`operations__content--active`);
  });

  document
    .querySelector(`.operations__content--${clicked.getAttribute(`data-tab`)}`)
    .classList.add(`operations__content--active`);
});

// Menu fading animation
const navigationMenu = document.querySelector(`.nav`);

const fadeMenu = function (event) {
  // console.log(this, event.currentTarget);
  if (event.target.classList.contains(`nav__link`)) {
    const targetLink = event.target;
    const siblingLinks = event.target
      .closest(`.nav`)
      .querySelectorAll(`.nav__link`);
    const logoLink = event.target.closest(`.nav`).querySelector(`img`);

    const self = this; // or use arrow function instead
    siblingLinks.forEach(function (sibling) {
      if (sibling !== targetLink) {
        // console.log(self);
        sibling.style.opacity = self;
        logoLink.style.opacity = self;
      }
    });
  }
};

navigationMenu.addEventListener(`mouseover`, fadeMenu.bind(0.5));

navigationMenu.addEventListener(`mouseout`, fadeMenu.bind(1));

// Sticky navigation bar
// const section1Rectangle = section1.getBoundingClientRect();

// window.addEventListener(`scroll`, function () {
//   if (this.window.scrollY > section1Rectangle.top) {
//     navigationMenu.classList.add(`sticky`);
//   } else {
//     navigationMenu.classList.remove(`sticky`);
//   }
// });

const header = document.querySelector(`.header`);
const navigationMenuHeight = navigationMenu.getBoundingClientRect().height;

const stickyNaviagtionMenu = function (entries) {
  const entry = entries[0];
  // console.log(entry);

  if (entry.isIntersecting === false) {
    navigationMenu.classList.add(`sticky`);
  } else {
    navigationMenu.classList.remove(`sticky`);
  }
};

const headerObserver = new IntersectionObserver(stickyNaviagtionMenu, {
  root: null,
  threshold: 0,
  rootMargin: `-${navigationMenuHeight}px`,
});

headerObserver.observe(header);

// Reveal hidden sections
const allSections = document.querySelectorAll(`.section`);
const revealSections = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);

  if (entry.isIntersecting === false) {
    return;
  } else {
    entry.target.classList.remove(`section--hidden`);
  }
  // console.log(entry.target.classList);

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.25,
  // rootMargin: `-1px`,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // console.log(section);
  section.classList.add(`section--hidden`);
});

// Load blurry images
const allLazyImages = document.querySelectorAll(`.lazy-img`);

const loadImages = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);

  if (!entry.isIntersecting) {
    return;
  }

  // console.log(entry.target.src);
  // console.log(entry.target.getAttribute(`data-src`));
  entry.target.src = entry.target.getAttribute(`data-src`);

  entry.target.classList.remove(`lazy-img`);

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.01,
  rootMargin: `100px`,
});

allLazyImages.forEach(function (images) {
  imageObserver.observe(images);
});

// Sliders
const slides = document.querySelectorAll(`.slide`);
const leftSlidesButton = document.querySelector(`.slider__btn--left`);
const rightSlidesButton = document.querySelector(`.slider__btn--right`);

let currentSlide = 0;
const numberOfSlides = slides.length;

// Slide dots
const slideDotsContainer = document.querySelector(`.dots`);

const createDots = function () {
  slides.forEach(function (item, index) {
    slideDotsContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

const allDots = document.querySelectorAll(`.dots__dot`);

const showCurrentDot = function (slideNumber) {
  allDots.forEach(function (item) {
    item.classList.remove(`dots__dot--active`);
  });

  document
    .querySelector(`.dots__dot[data-slide="${slideNumber}"]`)
    .classList.add(`dots__dot--active`);
  // slide.classList.add(`dots__dot--active`);
};

slideDotsContainer.addEventListener(`click`, function (event) {
  if (event.target.classList.contains(`dots__dot`)) {
    const slide = event.target.getAttribute(`data-slide`);
    // console.log(event.target.getAttribute(`data-slide`));

    goToSlide(slide);
    currentSlide = +slide;
    showCurrentDot(slide);
  }
});

const goToSlide = function (destination) {
  slides.forEach(function (slide, index) {
    slide.style.transform = `translateX(${(index - destination) * 100}%)`;
  });
  //change dots
  showCurrentDot(destination);
};
goToSlide(0);

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = numberOfSlides - 1;
  } else {
    currentSlide = currentSlide - 1;
  }

  // console.log(currentSlide);
  goToSlide(currentSlide);
};

const nextSlide = function () {
  if (currentSlide === numberOfSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide = currentSlide + 1;
  }

  goToSlide(currentSlide);
};

slides.forEach(function (slide, index) {
  // console.log(`translateX(${index * 100}%)`);
  slide.style.transform = `translateX(${index * 100}%)`;
  slide.style.overflow = `visible`;
});

leftSlidesButton.addEventListener(`click`, previousSlide);

rightSlidesButton.addEventListener(`click`, nextSlide);
