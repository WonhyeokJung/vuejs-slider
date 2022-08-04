import { addEvent, eventsEmitter } from '../utils/event';
import { prevSlide, nextSlide } from '../utils/slide';

export function arrow(state) {
  if (!state.useArrow.enabled) return;
  const {
    moveEventsData,
    tags
  } = state;
  const {
    on,
    // off,
    // trigger
  } = eventsEmitter;

  function onPrevClick() {
    if (!moveEventsData.transitionEnd) return;
    return prevSlide(state);
  }
  function onNextClick() {
    if (!moveEventsData.transitionEnd) return;
    return nextSlide(state);
  }

  on('init', () => {
    addEvent(tags.prevArrow, 'click', onPrevClick);
    addEvent(tags.nextArrow, 'click', onNextClick);
  })
}
