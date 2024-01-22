"use stirct";

//modal window button selection
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");
//scrolling button selection
const btnscrool = document.querySelector(".btn--scroll-to");

const togetscroll = document.querySelector("#section--1");

//modal window
const openmodal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closemodel = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.forEach((btn) => btn.addEventListener("click", openmodal));

btnCloseModal.addEventListener("click", closemodel);
overlay.addEventListener("click", closemodel);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closemodel();
  }
});

///////////////////////////////////////////////////////////////

// creating and inserting cookie message
const message = document.querySelector(".header");
const newhtml = document.createElement("div");
newhtml.classList.add("cookie-message");
newhtml.innerHTML = `
  <p>we use cookies for improved functionality and analytics.</p><button class="btn btn--close-cookie">okay</button>`;
newhtml.querySelector("p").style.color = "black";
message.insertAdjacentElement("afterbegin", newhtml);
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    newhtml.remove();
  });

/////////////////////////////////////////////////////////

//scrolling tech for learn more button

btnscrool.addEventListener("click", function () {
  const cordinates = togetscroll.getBoundingClientRect();
  console.log(cordinates);
  console.log(window.pageXOffset, window.pageYOffset);
  /*window.scrollTo(
      cordinates.left + window.pageXOffset,
      cordinates.top + window.pageYOffset
    );
  
    //for smooth scrooling(old way of doing)
  
    window.scrollTo({
      left: cordinates.left + pageXOffset,
      top: cordinates.top + pageYOffset,
      behavior: "smooth",
    });*/

  togetscroll.scrollIntoView({ behavior: "smooth" });
});

//---------------------------------------------------------

//navigation scrooling without event delegation

/*document.querySelectorAll(".nav__link").forEach((el) =>
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  })
);*/

//navigation scrooling with event delegation

//step 1 : select the common parent element

document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log(event.target);
    //use if loop
    if (event.target.classList.contains("nav__link")) {
      const id = event.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

// operation content tab
const btn = document.querySelectorAll(".operations__tab");
//selecting the parent element to do delegation
const container = document.querySelector(".operations__tab-container");
const tabcontainer = document.querySelectorAll(".operations__content");

container.addEventListener("click", function (event) {
  const clicked = event.target.closest(".operations__tab");

  //guard clause
  if (!clicked) return;
  //
  //removing active classes
  btn.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabcontainer.forEach((tabs) =>
    tabs.classList.remove("operations__content--active")
  );

  //activating content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
//---------------------------------------------------------------------------------------------------------
//creating a menu fade animation
const nav = document.querySelector(".nav");

//creating a function for fading
const handlehover = function (event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;

    const sibilings = link.closest(".nav").querySelectorAll(".nav__link");

    const logo = link.closest(".nav").querySelector("img");
    sibilings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

/*//one way of passing argumnet to the function

nav.addEventListener("mouseover", function (event) {
  handlehover(event, 0.5);
});
nav.addEventListener("mouseout", function (event) {
  handlehover(event, 1);
});
*/

// using bind method to pass argument to the function

nav.addEventListener("mouseover", handlehover.bind(0.5));
nav.addEventListener("mouseout", handlehover.bind(1));

//-------------------------------------------------------------------------

// making the nav bar sticky using window scroll event (this is not much effiecient)
/*
//const togetscroll = document.querySelector("#section--1");  when it reaches this place the nav bar should be sticky
const intialcords = togetscroll.getBoundingClientRect();
window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  if (window.scrollY > intialcords.top) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
});
*/

// STICKY navigation using INTERSECTION OBSERVER API

const target = document.querySelector(".header"); //target element

const stickynav = function (entries, observer) {
  const [entry] = entries;

  /*that is (if entry.isIntersecting === false)*/
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
  rootMargin: `-100px`,
});
observer.observe(target);

//-------------------------------------------------------
//REVEAL SECTION  USING iINTERSECTIONOBSERVER

//select all section as target
const allsection = document.querySelectorAll(".section");

const reavealsection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    //now remove the element section--hidden one by one
    //entry.target is there in
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(reavealsection, {
  root: null,
  threshold: 0.15,
});

allsection.forEach(function (section) {
  //console.log(section);
  sectionObserver.observe(section);

  //add the section--hidden to hidde the content intiali and then reveal when scrooled
  section.classList.add("section--hidden");
});

//----------------------------------------------------------------------------------------------

//lAZY LOADING IMAGES
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const imgcallfunc = function (entries, observe) {
  const [entry] = entries;

  //guard clasue
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgcallfunc, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});
//------------------------------------------------------------------------
//slider
const slides = document.querySelectorAll(".slide");
console.log(slides);
const btnleft = document.querySelector(".slider__btn--left");
const btnright = document.querySelector(".slider__btn--right");
let curslide = 0;
const maxslide = slides.length - 1;

//GOTOSLIDE
const gotoslide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

//slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i})%`));instead we are just callling the gotoslide
gotoslide(0);

//NEXTSLIDE
const nextslide = function () {
  if (curslide === maxslide) {
    curslide = 0;
  } else {
    curslide++;
  }
  gotoslide(curslide);
  //dot indicator
  activateDot(curslide);
};

//PREVIOUS SLIDE
const prevslide = function () {
  if (curslide === 0) {
    curslide = maxslide;
  } else {
    curslide--;
  }

  gotoslide(curslide);
  //dot indicator
  activateDot(curslide);
};

btnright.addEventListener("click", nextslide);
btnleft.addEventListener("click", prevslide);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    nextslide();
  }
  //we can also write the above code using short circuting ..just for fun
  event.key === "ArrowLeft" && prevslide();
});

//-------------------------------------------------------------------------------------------------------------------
//CREATING DOTS....

const dotcontainer = document.querySelector(".dots");

//adding dots for the each of the slides . ( WE ARE ONLY INTERESTED IN THE INDEX WE DONT NEED S )
const createDots = function () {
  slides.forEach(function (_, i) {
    dotcontainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

//event delegation instead of adding single event ot every dot we set it ot the parent element
dotcontainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    //geting the dataset slide from the dots to acces each dot
    const slide = e.target.dataset.slide;

    //call the gotoslide function and pass the current slide that you accesed from the dataset
    gotoslide(slide);
    activateDot(slide);
  }
});

//dots indicator
const activateDot = function (slide) {
  //first removing all the dots__dot--active class
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  //adding all the dots__dot--active class
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
