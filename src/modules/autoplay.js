import { addEvent, eventsEmitter } from '../utils/event';

export function autoplay(state) {
  // module 등록 후 apply(this값, ..args)로 호출했을 때 대비.
  if (!state) state = this;
  // state에 autoplay 옵션 추가
  Object.assign(state, { autoplay: { ...state.autoplay, running: false, paused: true } })
  const {
    autoplay,
    moveEventsData,
    transitionSpeed,
    tags,
    direction,
    loop
  } = state;
  const {
    on,
    off,
    trigger
  } = eventsEmitter;
  let autoSlideControl;

  function autoPrevSlide() {
    if (!moveEventsData.transitionEnd) return;
    moveEventsData.transitionEnd = false;
    // if non-loop else loop
    if (!state.loop && state.translate + 100 > 0) {
      state.translate = -100 * (state.tags.slides.length - 1);
      state.curIdx = state.tags.slides.length - 1;
    } else {
      state.translate += 100;
      state.curIdx -= 1;
    }
    tags.sliderWrapper.style.transitionDuration = `${transitionSpeed}ms`;
    if (direction === 'vertical') {
      tags.sliderWrapper.style.transform = `translate3d(0, ${state.translate}%, 0)`;
    } else {
      tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
    }
  }

  function autoNextSlide() {
    if (!moveEventsData.transitionEnd) return;
    moveEventsData.transitionEnd = false;
    // if non-loop else loop
    if (!loop && state.translate < -100 * (tags.sliderWrapper.children.length - 2)) {
      state.translate = 0;
      state.curIdx = 0;
    } else {
      state.translate -= 100;
      state.curIdx += 1;
    }
    tags.sliderWrapper.style.transitionDuration = `${transitionSpeed}ms`;
    if (direction === 'vertical') {
      tags.sliderWrapper.style.transform = `translate3d(0, ${state.translate}%, 0)`;
    } else {
      tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
    }
  }

  function run() {
    if (autoplay.running) return;
    const delay = autoplay.delay;
    autoplay.running = true;
    autoplay.paused = false;

    // attachTransitionEvent();

    if (autoplay.toForward) {
      autoSlideControl = setInterval(autoNextSlide, delay);
    } else {
      autoSlideControl = setInterval(autoPrevSlide, delay);
    }
  }

  function pause() {
    if (!autoplay.running || autoplay.paused) return;
    autoplay.running = false;
    autoplay.paused = true;

    // detachTransitionEvent();

    if (autoSlideControl) clearInterval(autoSlideControl);
  }

  function start() {
    if (autoplay.running) return;
    on('runAutoplay', () => {
      run();
    });
    trigger('runAutoplay');
  }
  function stop() {
    autoplay.running = false;
    clearInterval(autoSlideControl);
    off('runAutoplay');
  }

  function onTouchStart() {
    if (autoplay.disableOnInteraction) {
      stop();
    }
    pause();
  }
  function onTouchEnd() {
    run();
  }

  function onPointerEnter(e) {
    if (e.pointerType !== 'mouse') return;
    // moveEventsData.transitionEnd = false;
    if (autoplay.disableOnInteraction) return stop();
    pause();
  }
  function onPointerLeave(e) {
    if (e.pointerType !== 'mouse') return;
    // $el.removeEventListener('pointerenter', onPointerEnter);
    moveEventsData.transitionEnd = true;
    run();
  }

  // function onTransitionStart() {
  //   moveEventsData.transitionEnd = false;
  // }
  // function onTransitionEnd() {
  //   tags.sliderWrapper.style.transitionDuration = '0ms';
  //   if (state.translate === 0) {
  //     state.translate = -100 * (tags.slides.length - 2);
  //     state.curIdx = tags.slides.length;
  //     tags.sliderWrapper.style.transform = (direction === 'vertical') ? `translate3d(0, ${state.translate}%, 0)` : `translate3d(${state.translate}%, 0, 0)`;
  //   } else if (state.translate === -100 * (tags.slides.length - 1)) {
  //     state.translate = -100;
  //     state.curidx = 1;
  //     tags.sliderWrapper.style.transform = (direction === 'vertical') ? `translate3d(0, ${state.translate}%, 0)` : `translate3d(${state.translate}%, 0, 0)`;
  //   }

  //   moveEventsData.transitionEnd = true;
  // }

  function onVisibilityChange() {
    if (document.hidden && autoplay.running) {
      pause();
    } else {
      run();
    }
  }

  function attachTouchEvent() {
    addEvent(tags.$el, 'touchstart', onTouchStart);
    addEvent(tags.$el, 'touchend', onTouchEnd);
  }

  function attachMouseEvent() {
    addEvent(tags.$el, 'pointerenter', onPointerEnter);
    addEvent(tags.$el, 'pointerleave', onPointerLeave);
  }

  // function attachTransitionEvent() {
  //   addEvent(tags.$el, 'transitionstart', onTransitionStart);
  //   addEvent(tags.$el, 'transitionend', onTransitionEnd);
  // }

  // function detachTransitionEvent() {
  //   removeEvent(tags.$el, 'transitionstart', onTransitionStart);
  //   removeEvent(tags.$el, 'transitionend', onTransitionEnd);
  // }

  on('init', () => {
    if (autoplay.enabled) {
      addEvent(document, 'visibilitychange', onVisibilityChange);
      if (autoplay.pauseOnInteraction) {
        attachTouchEvent();
        attachMouseEvent();
      }
      start();
    }
  });

  on('update', () => {
    run();
  })
  on('destroy', () => {
    stop();
  })
} // autoplay 끝
