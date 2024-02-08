export default class ComparingSlider {
    constructor(options) {
        this.dragging = false;
        this.container = document.getElementById(options.containerId);
        this.container.classList.add('comparing-slider-container');
        this.container.innerHTML = `
            <img width="100%" src="${options?.right?.image}" alt="${options?.right?.alt ?? ''}">
            <div class="comparing-slider-resize-layer">
                <img width="100%" src="${options?.left?.image}" alt="${options?.left?.alt ?? ''}">
            </div>
            <div class="comparing-slider-handle">
            </div>`;
        this.handle = this.container.querySelector('.comparing-slider-handle');
        this.resizeLayer = this.container.querySelector('.comparing-slider-resize-layer');

        this.initialize();
    }

    initialize() {
        this.checkInitialPosition();
        window.addEventListener('scroll', this.throttledScrollHandler.bind(this));
        window.addEventListener('resize', this.throttledScrollHandler.bind(this));
        this.container.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.container.addEventListener("touchstart", this.handleMouseDown.bind(this));
    }

    checkInitialPosition() {
        const containerTop = this.container.offsetTop;
        const isBelowViewportCenter = window.scrollY + window.innerHeight * 0.5 > containerTop;
        this.container.classList.toggle('visible', isBelowViewportCenter);
    }

    throttledScrollHandler() {
        if (!this.throttleTimeout) {
            this.throttleTimeout = setTimeout(() => {
                this.checkInitialPosition();
                this.throttleTimeout = null;
            }, 100);
        }
    }

    animateHandle(event) {
        const eventX = event.type === 'touchmove' ? event.changedTouches[0].pageX : event.pageX;
        const dragWidth = this.handle.offsetWidth;
        const containerOffset = this.container.getBoundingClientRect().left;
        const containerWidth = this.container.offsetWidth;
        const minLeft = containerOffset - dragWidth / 2;
        const maxLeft = containerOffset + containerWidth - dragWidth / 2;

        const leftValue = Math.max(minLeft, Math.min(eventX, maxLeft));
        const widthValue = ((leftValue + dragWidth / 2 - containerOffset) / containerWidth) * 100 + '%';

        this.handle.style.left = widthValue;
        this.resizeLayer.style.width = widthValue;

        this.dragging = false;
    }

    handleMouseDown(event) {
        event.preventDefault();
        console.log(event.type);
        const isHandle = event.target.classList.contains('comparing-slider-handle');
        if (!isHandle) return;

        this.dragging = true;
        this.handle.classList.add('draggable');
        this.resizeLayer.classList.add('resizable');
        
        const moveHandler = (e) => {
            requestAnimationFrame(() => {
                this.animateHandle(e);
            });
        };

        const releaseHandler = () => {
            this.dragging = false;
            this.handle.classList.remove('draggable');
            this.resizeLayer.classList.remove('resizable');
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("mouseup", releaseHandler);
            document.removeEventListener("touchend", releaseHandler);
        };

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("touchmove", moveHandler);
        document.addEventListener("mouseup", releaseHandler);
        document.addEventListener("touchend", releaseHandler);
    }
}

window.createComparingSlider = (options) => new ComparingSlider(options);
