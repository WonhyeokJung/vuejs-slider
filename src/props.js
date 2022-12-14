
export function setProps(props) {
  const newProps = {
    init: true,
    sliderClass: 'slider',
    direction: 'horizontal',
    useArrow: {
      enabled: true,
      followDirection: true
    },
    autoplay: {
      enabled: false,
      toForward: true,
      delay: 3300,
      waitForTransition: true,
      disableOnInteraction: false,
      pauseOnInteraction: true,
    },
    usePagination: {
      enabled: false,
      clickable: false,
      dynamic: false,
      followDirection: true,
    },
    usePageNumber: {
      enabled: false
    },
    tag: 'div',
    width: 1000,
    height: 750,
    transitionSpeed: 700,
    loop: false,
  };
  if (typeof props !== 'object') return { newProps }

  for (const key of Object.keys(props)) {
    if (typeof props[key] === 'object') {
      for (const option of Object.keys(props[key])) {
        newProps[key][option] = props[key][option];
      }
    } else if (props[key] !== undefined) {
      newProps[key] = props[key];
    }
  }
  return { newProps }
}
