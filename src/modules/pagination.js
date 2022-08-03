import { eventsEmitter, addEvent } from '../utils/event';

export function pagination(state) {
  function start() {
    const target = state.tags.sliderWrapper;
    const option = {
      childList: true,
      attributes: true,
      attributeFilter: ['style'],
    }

    const observer = new MutationObserver((mutations) => {
      const slideLength = state.loop ? state.tags.slides.length - 2 : state.tags.slides.length;
      for (const dot of state.tags.pagination.children) {
        if ((slideLength + 1) * 100 === -state.translate && dot.dataset.index === '1') {
          dot.classList.add('slider-pagination__dot--active');
        } else if (state.loop && state.translate === 0 && dot.dataset.index / 1 === slideLength) {
          dot.classList.add('slider-pagination__dot--active');
        } else if (state.loop && dot.dataset.index / 1 === state.translate / (-100)) {
          dot.classList.add('slider-pagination__dot--active');
        } else if (!state.loop && dot.dataset.index / 1 - 1 === state.translate / (-100)) {
          dot.classList.add('slider-pagination__dot--active');
        } else {
          dot.classList.remove('slider-pagination__dot--active');
        }
      }
    })

    observer.observe(target, option);
  }

  function onClick(e) {
    // for (const dot of tags.pagination.children) {
    //   if (dot.dataset.index !== this.dataset.index) {
    //     dot.classList.remove('slider-pagination__dot--active');
    //   }
    // }
    state.translate = (this.dataset.index - 1) * (-100);
    // type변경
    state.curIdx = this.dataset.index / 1 - 1;
    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`;
    if (state.direction === 'vertical') {
      state.tags.sliderWrapper.style.transform = `translate3d(0, ${state.translate}%, 0)`;
    } else {
      state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
    }
    // this.classList.add('slider-pagination__dot--active');
  }

  function create() {
    const slideLength = state.loop ? state.tags.slides.length - 2 : state.tags.slides.length;

    if (state.tags.pagination !== '.slider-pagination') {
      state.tags.pagination.classList.add('slider-pagination');
    }
    if (state.usePagination.followDirection && state.direction === 'vertical') {
      state.tags.pagination.classList.add('slider-pagination-vertical');
    }

    for (let i = 0; i < slideLength; i++) {
      const dot = document.createElement('span');
      if (state.usePagination.dynamic) {
        dot.setAttribute('class', 'slider-pagination__dot--dynamic')
      } else {
        dot.setAttribute('class', 'slider-pagination__dot');
      }

      if (state.usePagination.clickable) {
        dot.classList.add('slider-pagination__dot--click');
        addEvent(dot, 'click', onClick);
      }
      dot.dataset.index = i + 1;
      state.tags.pagination.appendChild(dot);
    }

    if (state.tags.pagination.children.length) state.tags.pagination.children[0].classList.add('slider-pagination__dot--active')

    start();
  }

  function destroy() {
    Array.from(state.tags.pagination.children).forEach(el => {
      el.remove()
    });
  }

  eventsEmitter.on('init', () => {
    if (!state.tags.pagination || !state.usePagination.enabled) return;
    create();
  })
  eventsEmitter.on('update', () => {
    if (!state.tags.pagination || !state.usePagination.enabled) return;
    create();
  })
  eventsEmitter.on('destroy', () => {
    destroy();
  })
}
