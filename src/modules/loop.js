import { h } from 'vue'

function createLoop(vnode) {
  if (vnode.length === 0 || vnode === null || vnode === undefined) return
  const slides = vnode.map((child, index) => {
    if (!child.props) child.props = {};
    child.props = {}; // v-for로 h() 생성시 child.props에 key가 들어가는데 중복 호출시(v-for로 부르지 않은 slider-slide가 있는 경우 반복 호출) 이 값이 중복되므로 props 자체를 없애 해결.
    child.props['data-index'] = index;
    return child;
  })
  const prechild = h(slides[slides.length - 1].type, { ...slides[slides.length - 1].props }, slides[slides.length - 1].children)
  const nextchild = h(slides[0].type, { ...slides[0].props }, slides[0].children)
  return [prechild, ...slides, nextchild]
}

export { createLoop }
