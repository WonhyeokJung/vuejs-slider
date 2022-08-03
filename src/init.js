import { autoplay } from './modules/autoplay';
import { addEvent, eventsEmitter } from './utils/event';
import { arrow } from './modules/arrow';
import { pageNumber } from './modules/page-number';
import { pagination } from './modules/pagination';

export function init(props) {
  const state = Object.assign({ ...props }, {
    translate: props.loop ? -100 : 0,
    curIdx: props.loop ? 1 : 0,
    moveEventsData: {
      transitionStart: false,
      transitionEnd: true,
    },
    tags: {
      $el: document.querySelector('.slider'),
      sliderWrapper: document.querySelector('.slider-wrapper'),
      slides: document.querySelector('.slider-wrapper').children,
      prevArrow: document.querySelector('.slider-arrow__prev'),
      nextArrow: document.querySelector('.slider-arrow__next'),
      pagination: document.querySelector('.slider-pagination'),
      pageNumber: document.querySelector('.slider-page-number')
    },
  });
  if (state.direction === 'vertical') state.tags.sliderWrapper.classList.add('vertical');
  else state.tags.sliderWrapper.classList.add('horizontal');
  function onTransitionStart() {
    if (state.loop) {
      state.moveEventsData.transitionEnd = false;
    }
  }
  function onTransitionEnd() {
    if (state.loop) {
      state.tags.sliderWrapper.style.transitionDuration = '0ms';
      if (state.translate === 0) {
        state.translate = -100 * (state.tags.slides.length - 2);
        state.curIdx = state.tags.slides.length - 2;
        state.tags.sliderWrapper.style.transform = (state.direction === 'vertical') ? `translate3d(0, ${state.translate}%, 0)` : `translate3d(${state.translate}%, 0, 0)`;
      } else if (state.translate === -100 * (state.tags.slides.length - 1)) {
        state.translate = -100;
        state.curIdx = 1;
        state.tags.sliderWrapper.style.transform = (state.direction === 'vertical') ? `translate3d(0, ${state.translate}%, 0)` : `translate3d(${state.translate}%, 0, 0)`;
      }
    }

    state.moveEventsData.transitionEnd = true;
  }

  eventsEmitter.on('init', () => {
    addEvent(state.tags.$el, 'transitionstart', onTransitionStart);
    addEvent(state.tags.$el, 'transitionend', onTransitionEnd);
  })
  autoplay(state);
  arrow(state);
  pageNumber(state);
  pagination(state);
  eventsEmitter.trigger('init');
}
