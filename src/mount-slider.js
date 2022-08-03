import { init } from './init';

export function mountSlider(props) {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  if (props.loop) {
    sliderWrapper.style.transform = props.direction === 'vertical' ? 'translate3d(0, -100%, 0)' : 'translate3d(-100%, 0, 0)';
    sliderWrapper.style.webkitTransform = props.direction === 'vertical' ? 'translate3d(0, -100%, 0)' : 'translate3d(-100%, 0, 0)';
  } else {
    sliderWrapper.style.transform = 'translate3d(0, 0, 0)';
    sliderWrapper.style.webkitTransform = 'translate3d(0, 0, 0)';
  }
  init(props);
}
