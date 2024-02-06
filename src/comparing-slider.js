class ComparingSlider {
    constructor(options) {
        this.dragging = false;
        this.container = document.getElementById(options.containerId);
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

    animateHandle(event, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth) {
        let leftValue = event.pageX + xPosition - dragWidth;
        leftValue = Math.max(minLeft, Math.min(leftValue, maxLeft));
        const widthValue = ((leftValue + dragWidth / 2 - containerOffset) / containerWidth) * 100 + '%';

        this.handle.style.left = widthValue;
        this.resizeLayer.style.width = widthValue;

        this.dragging = false;
    }

    handleMouseDown(event) {
        const isHandle = event.target.classList.contains('comparing-slider-handle');
        if (!isHandle) return;

        this.dragging = true;
        this.handle.classList.add('draggable');
        this.resizeLayer.classList.add('resizable');

        const dragWidth = this.handle.offsetWidth;
        const xPosition = this.handle.getBoundingClientRect().left + dragWidth - event.pageX;
        const containerOffset = this.container.getBoundingClientRect().left;
        const containerWidth = this.container.offsetWidth;
        const minLeft = containerOffset - dragWidth/2;
        const maxLeft = containerOffset + containerWidth - dragWidth/2;

        const moveHandler = (e) => {
            requestAnimationFrame(() => {
                this.animateHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth);
            });
        };

        const releaseHandler = () => {
            this.dragging = false;
            this.handle.classList.remove('draggable');
            this.resizeLayer.classList.remove('resizable');
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("mouseup", releaseHandler);
        };

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", releaseHandler);

        event.preventDefault();
    }
}

window.createComparingSlider = (options) => new ComparingSlider(options);

export default ComparingSlider;
