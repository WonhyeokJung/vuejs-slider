import { eventsEmitter } from '../utils/event';

export function pageNumber(state) {
  function run() {
    const pageNum = document.querySelector('.slider-page-number__content');
    const target = state.tags.sliderWrapper;
    const option = {
      // child 변경 감지
      childList: true,
      attributes: true,
      attributeFilter: ['style'],
    };
    const observer = new MutationObserver((mutations) => {
      let idx = state.curIdx;
      if (state.tags.slides.length) {
        if (state.loop) {
          if (idx === 0) idx = state.tags.slides.length - 2;
          else if (idx === state.tags.slides.length - 1) idx = 1;
          pageNum.innerHTML = `${idx} / ${state.tags.slides.length - 2}`
        } else {
          pageNum.innerHTML = `${idx + 1} / ${state.tags.slides.length}`;
        }
      }
    });

    observer.observe(target, option);
  }

  function create() {
    const pageNum = document.createElement('div');
    pageNum.classList.add('slider-page-number__content');
    state.tags.pageNumber.appendChild(pageNum);
    if (state.loop) {
      pageNum.innerHTML = `${state.curIdx} / ${state.tags.slides.length - 2}`;
    } else {
      pageNum.innerHTML = `${state.curIdx + 1} / ${state.tags.slides.length}`;
    }
    run();
  }

  eventsEmitter.on('init', () => {
    if (!state.usePageNumber.enabled) return;
    create();
  })

  eventsEmitter.on('destroy', () => {
    if (document.querySelector('.slider-page-number__content')) document.querySelector('.slider-page-number__content').remove();
  })

  eventsEmitter.on('update', () => {
    if (!state.usePageNumber.enabled) return;
    create();
  })
}
