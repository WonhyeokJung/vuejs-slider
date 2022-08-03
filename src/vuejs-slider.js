import { h, nextTick, onMounted, onUpdated, ref } from 'vue'
import { createLoop } from './modules/loop'
// import { updateSlider } from './update-slider'
import { mountSlider } from './mount-slider'
import { setProps } from './props'
import { eventsEmitter } from './utils/event'

const Slider = {
  name: 'Slider',
  props: {
    init: {
      type: Boolean,
      default: undefined
    },
    sliderClass: {
      type: String,
      default: undefined
    },
    direction: {
      type: String,
      default: undefined
    },
    useArrow: {
      type: Object,
      default: undefined
    },
    autoplay: {
      type: Object,
      // undefined 처리 후 setup 내에서 추가
      default: undefined
    },
    usePagination: {
      type: Object,
      default: undefined
    },
    usePageNumber: {
      type: Object,
      default: undefined
    },
    tag: {
      type: String,
      default: undefined
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    transitionSpeed: {
      type: Number,
      default: undefined
    },
    loop: {
      type: Boolean,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const { newProps } = setProps(props);
    function getSlides(slots) {
      if (slots === undefined) return
      const slides = [];
      function pushSlides(vnodes) {
        // iterable check
        if (!Array.isArray(vnodes)) return
        vnodes.forEach((vnode) => {
          // children이 있으며 & symbol type(유일성 체크) 인지 체크
          if (typeof vnode.type === 'symbol' && vnode.children) {
            pushSlides(vnode.children)
          } else if (vnode.type && vnode.type.name === 'SliderSlide') {
            slides.push(vnode)
          }
        })
      }
      Object.keys(slots).forEach(slotName => {
        if (typeof slots[slotName] !== 'function' || slotName !== 'default') return
        pushSlides(slots[slotName]())
      })

      return { slides }
    }

    function renderSlides(slides) {
      return createLoop(slides)
    }
    onMounted(() => {
      nextTick(function () {
        console.log('mounted')
        mountSlider(newProps)
      })
    })
    onUpdated(() => {
      eventsEmitter.trigger('destroy');
      nextTick(function () {
        console.log('updated');
        eventsEmitter.trigger('update');
      })
    })
    return () => {
      // for문 Slider-slide 까지 불러옴.
      const { slides } = getSlides(slots);
      return h(newProps.tag, {
        ref: 'slider',
        class: [newProps.sliderClass.value === 'slider' ? newProps.sliderClass.value : (newProps.sliderClass.value, 'slider')],
        style: [`width: ${newProps.width}px`, `height: ${newProps.height}px`]
      }, [
        slots['container-start'] && slots['container-start'](),
        h('div', { ref: 'sliderWrapperClass', class: ['slider-wrapper'] }, [
          // 슬롯 순서대로 정의됨. slots.default가 있는지 확인하고 그 다음에 default에 작성한 내용을 Rendering(slotProps 전달)
          newProps.loop ? renderSlides(slides) : slides // slots.default && slots.default()
        ]),
        slots['container-end'] && slots['container-end'](),
        newProps.useArrow.enabled ? [h('div', { class: ['slider-arrow__prev', newProps.direction === 'vertical' ? 'slider-arrow-vertical__prev' : 'slider-arrow-horizontal__prev'], innerHTML: '<div>&lt;</div>' }), h('div', { class: ['slider-arrow__next', newProps.direction === 'vertical' ? 'slider-arrow-vertical__next' : 'slider-arrow-horizontal__next'], innerHTML: '<div>&gt;</div>' })] : '',
        newProps.usePagination.enabled ? [h('div', { class: ['slider-pagination'] })] : '',
        newProps.usePageNumber.enabled ? [h('div', { class: ['slider-page-number'] })] : '',
      ])
    }
  }
}

const SliderSlide = {
  name: 'SliderSlide',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, context) {
    const {
      slots
    } = context
    const slideClass = ref('slider-slide');
    return () => {
      return h(props.tag, {
        class: [slideClass.value],
        loading: 'lazy',
        // 외부 컴포넌트 렌더링
        // slots.default && slots.default()[0] 첫째 자식만 가져오게 됨.
      }, [(slots.default && slots.default()) || h('div', {
        style: 'width: 100%; height: 100%',
        textContent: 'Slide',
      })] // array of Children
      )
    }
  }
}

export { SliderSlide, Slider }
