import ComparingSlider from '../src/comparing-slider.js';

describe('ComparingSlider', () => {
    let slider;

    beforeEach(() => {
        // Create a container element for the slider
        const container = document.createElement('div');
        container.id = 'slider-container';
        document.body.appendChild(container);

        // Create options for the slider
        const options = {
            containerId: 'slider-container',
            left: {
                image: '/images/left.jpg',
                alt: 'Left Image'
            },
            right: {
                image: '/images/right.jpg',
                alt: 'Right Image'
            }
        };

        // Create a new instance of ComparingSlider
        slider = new ComparingSlider(options);
    });

    afterEach(() => {
        // Remove the container element after each test
        const container = document.getElementById('slider-container');
        container.remove();
    });

    afterAll(() => {
        // Remove the slider instance after all tests
        slider = null;
    });

    it('should initialize the slider', () => {
        expect(slider.dragging).toBe(false);
        expect(slider.container.classList.contains('comparing-slider-container')).toBe(true);
        expect(slider.handle.classList.contains('comparing-slider-handle')).toBe(true);
        expect(slider.resizeLayer.classList.contains('comparing-slider-resize-layer')).toBe(true);
    });

    it('should check the initial position of the slider', () => {
        slider.checkInitialPosition();
        expect(slider.container.classList.contains('visible')).toBe(true);
    });

    it('should animate the handle and resize layer', () => {
        const event = {
            pageX: 100
        };
        const xPosition = 50;
        const dragWidth = 0;
        const minLeft = 0;
        const maxLeft = 100;
        const containerOffset = 0;
        const containerWidth = 200;

        slider.animateHandle(event, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth);

        expect(slider.handle.style.left).toBe('50%');
        expect(slider.resizeLayer.style.width).toBe('50%');
        expect(slider.dragging).toBe(false);
    });

    it('should handle mouse down event', () => {
        const event = {
            target: slider.handle,
            pageX: 100,
            preventDefault: () => {},
        };

        slider.handleMouseDown(event);

        expect(slider.dragging).toBe(true);
        expect(slider.handle.classList.contains('draggable')).toBe(true);
        expect(slider.resizeLayer.classList.contains('resizable')).toBe(true);
    });

    it('should handle mouse move event', () => {
        const event = {
            pageX: 150
        };
        const xPosition = 50;
        const dragWidth = 0;
        const minLeft = 0;
        const maxLeft = 10;
        const containerOffset = 0;
        const containerWidth = 200;

        slider.dragging = true;
        slider.handle.classList.add('draggable');
        slider.resizeLayer.classList.add('resizable');

        slider.animateHandle(event, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth);

        expect(slider.handle.style.left).toBe('5%');
        expect(slider.resizeLayer.style.width).toBe('5%');
        expect(slider.dragging).toBe(false);
    });
});
