
export function setProps(props) {
  // props가 object인 경우, 특정 값만 변경하여 넣으면 다른 object.keys는 전부 사라져서 따로 변경하여 사용.
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
      toForward: false,
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
      enabled: true
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
