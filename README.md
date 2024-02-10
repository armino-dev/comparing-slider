# Comparing Slider

This is a vanilla javascript component to compare two images with a slider. 
Inspired from [CodyHouse's jQuery plugin](https://github.com/codyhouse/image-comparison-slider)

## Getting started

### Using npm

```bash
npm i @armino-dev/comparing-slider
```

Import the components into your script.

```js
import ComparingSlider from '@armino-dev/comparing-slider';
```

Import the css into your stylesheet.

```css
import '@armino-dev/comparing-slider/dist/comparing-slider.min.css';
```

### Directly into your html from node_modules

```html
<script type="module" src="node_modules/@armino-dev/comparing-slider/dist/comparing-slider.min.js"></script>
<link rel="stylesheet" href="node_modules/@armino-dev/comparing-slider-dialog/dist/comparing-slider.min.css" />
```

### Directly into your html from cdn
```html
<script type="module" src="https://esm.sh/@armino-dev/comparing-slider/dist/comparing-slider.min.js"></script>
<link rel="stylesheet" href="https://esm.sh/@armino-dev/comparing-slider/dist/comparing-slider.min.css" />
```

## Use it

```js

const options = {
        // the container id where the code will be rendered
        containerId: 'container1',
        left: {
            image: '//path/to/the/image',
            alt: 'Some alternative text'
        },
        right: {
            image: '//path/to/the/image',
            alt: 'Some alternative text'
        }
};

document.addEventListener("DOMContentLoaded", () => {
    new ComparingSlider(options); // if using es6 import style
    // or createComparingSlider(options) // if using cdn/local script into html
});
```

### **Please take a look at [this working example on  CodePen](https://codepen.io/armino-dev/pen/PoLBdMd).**

## Demo

Demo can be viewed on [here](https://armino-dev.github.io/comparing-slider/demo/)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the specs(tests) as appropriate.

## License
[MIT](LICENSE)
