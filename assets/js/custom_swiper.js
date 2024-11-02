/**=====================
    Custom Swiper js
==========================**/
var swiper = new Swiper(".slider-1", {
    slidesPerView: 1,
    spaceBetween: 12,
    centeredSlides: false,
    slidesPerGroup: 1,
    slidesPerView: "auto",
  });
  
  var swiper2 = new Swiper(".story-slider", {
    slidesPerView: 5,
    spaceBetween: 11,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  var swiper3 = new Swiper(".cab-onboarding-slider", {
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
    },
  });
  
  var swiper4 = new Swiper(".card-swiper", {
    slidesPerView: "auto",
    spaceBetween: 12,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  var swiper5 = new Swiper(".slider-1-1", {
    slidesPerView: 1.1,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  var swiper6 = new Swiper(".category-slider", {
    slidesPerView: 3.8,
    spaceBetween: 10,
  });
  
  var swiper7 = new Swiper(".feature-slider", {
    slidesPerView: 2.3,
    spaceBetween: 10,
    breakpoints: {
      0: {
        slidesPerView: 1.5,
      },
      420: {
        slidesPerView: 2.3,
      },
    },
  });
  
  var swiper8 = new Swiper(".slider-4", {
    slidesPerView: 4.3,
    spaceBetween: 10,
  });
  
  var swiper9 = new Swiper(".hotel-slider", {
    pagination: {
      el: ".swiper-pagination",
    },
  });
  
  var swiper10 = new Swiper(".hotel-slider-4", {
    slidesPerView: 5,
    breakpoints: {
      0: {
        slidesPerView: 4.5,
      },
      406: {
        slidesPerView: 5,
      },
    },
  });
  
  var swiper11 = new Swiper(".view-slider", {
    slidesPerView: 1.7,
    spaceBetween: 16,
  });
  
  var swiper12 = new Swiper(".fingHotel", {
    spaceBetween: 10,
    loop: true,
    loopFillGroupWithBlank: true,
  });
  
  var swiper13 = new Swiper(".room-view-slider", {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });
  
  var swiper14 = new Swiper(".top-reviewer-slider", {
    slidesPerView: 1.1,
    spaceBetween: 16,
  });
  
  var swiper15 = new Swiper(".brand-slider", {
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    allowTouchMove: false,
    disableOnInteraction: true,
  });
  
  var swiper16 = new Swiper(".thumbs-image", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  
  var swiper17 = new Swiper(".main-slider", {
    spaceBetween: 10,
    thumbs: {
      swiper: swiper16,
    },
  });
  
  var swiper18 = new Swiper(".banner-slider", {
    slidesPerView: 1.15,
    spaceBetween: 13,
  });
  
  var swiper19 = new Swiper(".slider-2-3", {
    slidesPerView: 2.3,
    spaceBetween: 11,
  });
  
  var swiper20 = new Swiper(".financial-slider", {
    pagination: {
      el: ".swiper-pagination",
    },
  });
  
  var swiper21 = new Swiper(".bill-slider", {
    slidesPerView: 2.2,
    spaceBetween: 15,
    breakpoints: {
      0: {
        slidesPerView: 1.7,
      },
      380: {
        slidesPerView: 2,
      },
      405: {
        slidesPerView: 2.2,
      },
      480: {
        slidesPerView: 2.5,
      },
    },
  });
  
  var swiper22 = new Swiper(".onboarding-content-slider", {
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
  
  var swiper23 = new Swiper(".relative-slider", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    fade: true,
    direction: "vertical",
    watchSlidesProgress: true,
  });
  
  var swiper24 = new Swiper(".main-slider2", {
    spaceBetween: 10,
    thumbs: {
      swiper: swiper23,
    },
  });
  
  var swiper25 = new Swiper(".grocery-category-slider", {
    slidesPerView: "auto",
    spaceBetween: 7,
  });