function prevSlide(state) {
  if (!state.loop && state.translate + 100 > 0) return (state.moveEventsData.transitionEnd = true);
  state.translate += 100
  state.curIdx -= 1
  state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`;
  state.direction === 'vertical' ? state.tags.sliderWrapper.style.transform = `translate3d(0, ${state.translate}%, 0)` : state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
}
function nextSlide(state) {
  if (!state.loop && state.translate < -100 * (state.tags.sliderWrapper.children.length - 2)) return (state.moveEventsData.transitionEnd = true);
  state.translate -= 100;
  state.curIdx += 1;
  state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`;
  state.direction === 'vertical' ? state.tags.sliderWrapper.style.transform = `translate3d(0, ${state.translate}%, 0)` : state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
}

function slideTo(state) {}

export {
  prevSlide,
  nextSlide,
  slideTo
}
