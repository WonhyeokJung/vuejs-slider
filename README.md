# vuejs-slider

> vuejs-slider is simple slider for vue.js
> It supports Vue.js only so if you want to use pure JavaScript slider, please visit https://github.com/WonhyeokJung/pure-js-slider

## Get Started

```bash
npm install vuejs-slider
```

## HTML Layout

```html
<!-- main container -->
<Slider>
  <!-- slides -->
  <SliderSlide></SLiderSlide>
  <SliderSlide></SLiderSlide>
</Slider>
```



## Initialize vuejs-slider

```vue
<template>...</template>
<script>
  // slider
	import {Slider, SliderSlide } from 'vuejs-slider/src/vuejs-slider'
  // css
  import 'vuejs-slider/css/vuejs-slider.css';
  export default {
    components: {
      Slider,
      SliderSlide
    }
  }
</script>
```



## Usage

```html
<template>
	<Slider
          :width="11200"
          :heigth="900"
          :useArrow="{ enabled: true }"
          :usePagination="{ enabled: true, clickable: true }"
          :loop="true"
          :autoplay="{ enabled: true }"
          >
  	<SliderSlide>Slide1</SliderSlide>
    <SlideSlide><img src="..."></SlideSlide>
  </Slider>
</template>
```

