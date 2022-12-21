(function () {
    const header = document.querySelector('.hat');
    window.onscroll = () => {
        if (window.scrollY > 70) {
            header.classList.add('header__active');
        } else {
            header.classList.remove('header__active');
        }
    };
})();


/* Burger */
const burger__btn = document.querySelector('.dropbtn')
const burger__content = document.querySelector('.dropdown-content')

burger__btn.addEventListener('click', (e) => {
  if (burger__content.classList.contains('active__content')) {
    burger__btn.classList.remove('active')
    burger__content.classList.remove('active__content')
  } else {
    burger__btn.classList.add('active')
    burger__content.classList.add('active__content')
  }
})

// Open search
const search__container = document.querySelector('.search-container')

function close__search (e) {
  if (search__container.querySelector('.search__input').classList.contains('input__active') && e.target != search__container.querySelector('.search__btn')) {
    document.addEventListener('click', (e) => {
      const click = e.composedPath().includes(search__container)
      if (click != search__container) {
        search__container.querySelector('.search__input').classList.remove('input__active')
      }
    })
  }
}

if (!search__container.querySelector('.search__input').classList.contains('input__active')) {
  search__container.addEventListener('click', () => {
    search__container.querySelector('.search__input').classList.add('input__active')
  })
  close__search()
}


// Play video

const button__pause = document.querySelector('.button-pause');
if (document.querySelector('.button-pause')) {
  const video__intro__sec = document.querySelector('.video__intro__sec');
  button__pause.addEventListener('click', () => {
    if (video__intro__sec.paused == true) {
      video__intro__sec.play();
    } else {
      video__intro__sec.pause();
    }
  });
}

//Переключение табов

  class Tabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  new Tabs('.popular-goods');
  new Tabs('.series');



// Swipers 

  const popular__swiper = new Swiper(".popular__swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
  });


  function series__swiper(section, container__swiper) {
    if (section) {
      const slider__section = Array.from(document.querySelector(section).querySelectorAll(container__swiper));
      slider__section.forEach((slider__element) => {
        const nextBtn = slider__element.querySelector('.swiper-button-next');
        const prevBtn = slider__element.querySelector('.swiper-button-prev');
        const pagination = slider__element.querySelector('.swiper-pagination');
        const series__swiper = new Swiper(slider__element.querySelector('.series__swiper'), {
          slidesPerView: 1,
          spaceBetween: 10,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
          },
          pagination: {
            el: pagination,
            type: "fraction",
          },
        });
      })
    }
  }
  series__swiper('.series', '.tabs__pane')

  const video__swiper = new Swiper(".video__swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    initialSlide: 1,
    pagination: {
      el: ".swiper-pagination",
    },
  });

  function portfolio__swiper(section) {
    if (section) {
      const galleryThumbs = new Swiper('.gallery-thumbs', {
        simulateTouch: false,
        slidesPerView: 'auto',
        spaceBetween: 30,
        direction: "vertical",
      });

      const nextBtn = document.querySelector(section).querySelector('.swiper-button-next');
      const prevBtn = document.querySelector(section).querySelector('.swiper-button-prev');
      const pagination = document.querySelector(section).querySelector('.swiper-pagination');

      const gallery__top = new Swiper(document.querySelector(section).querySelector('.gallery-top'), {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        pagination: {
          el: pagination,
          type: "fraction",
        },
        thumbs: {
          swiper: galleryThumbs,
        },
      });
    }
  }

  portfolio__swiper('.portfolio')

  // Change img

  const slides__thumbs = document.querySelector('.gallery-thumbs').querySelectorAll('.swiper-slide')
  slides__thumbs.forEach(slide => {
    slide.addEventListener('click', (e) => {
      const active__big__img = document.querySelector('.gallery-top ').querySelector('.swiper-slide-active').querySelector('img')
      if (e.target.src != undefined) {
        active__big__img.src = e.target.src
      }
    })
  })

  const ideas__swiper = new Swiper(".ideas__swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
  });

  if (window.innerWidth <= 768) {
    const tags__swiper = new Swiper(".tags__swiper", {
      slidesPerView: 'auto',
      spaceBetween: 20,
      cssMode: false,
      initialSlide: 1,
    });
  }
  
  const news__swiper = new Swiper(".news__swiper", {
    slidesPerView: 4,
    spaceBetween: 40,
    navigation: {
      nextEl: ".news__btn__next",
      prevEl: ".news__btn__prev",
    },
  });

  const subSwiperThumbs = new Swiper(".sub-swiper-thumbs", {
    slidesPerView: 4,
    spaceBetween: 40,
    direction: "vertical",
    navigation: {
      nextEl: ".news__btn__next",
      prevEl: ".news__btn__prev",
    },
  });

  const clients__swiper = new Swiper(".clients__swiper", {
    slidesPerView: 5,
    spaceBetween: 20,
  });

  const reviews__swiper = new Swiper(".reviews__swiper", {
    slidesPerView: 4,
    spaceBetween: 40,
    navigation: {
      nextEl: ".reviews__btn__next",
      prevEl: ".reviews__btn__prev",
    },
  });

