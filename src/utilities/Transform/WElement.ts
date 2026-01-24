export interface IWElement {
    addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;

    /**
     * Get element dimension
     */
    getDimension(): {
        x: number;
        y: number;
        angle: number;
        width: number;
        height: number;
        ratio: number;
    };

    /**
     * Set element dimension
     */
    setDimension({
        x,
        y,
        angle,
        width,
        height,
    }: {
        x?: number;
        y?: number;
        angle?: number;
        width?: number;
        height?: number;
    }): void;

    /**
     * Set position css property
     * @param position
     */
    setPosition(position: 'fixed' | 'relative' | 'absolute' | 'unset'): void;

    /**
     * Perform drag
     * @param x
     * @param y
     */
    drag(x: number, y: number): void;

    /**
     * Perform rotation
     * @param angle
     */
    rotate(angle: number): void;

    /**
     * Perform resize
     * @param width
     * @param height
     */
    resize(width: number, height: number): void;
}

/**
 * This is basically HTMLElement extension prefix with Will as unique identifier
 */
class WElement implements IWElement {
    private element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void {
        this.element.addEventListener(type, listener, options);
    }

    drag(x: number, y: number): void {
        this.setDimension({ x, y });
    }

    rotate(angle: number): void {
        this.setDimension({ angle });
    }
    resize(width: number, height?: number): void {
        this.setDimension({ width, height });
    }

    setPosition(position: 'fixed' | 'relative' | 'absolute' | 'unset'): void {
        this.element.style.setProperty('position', position, 'important');
    }

    setDimension({
        x,
        y,
        angle,
        width,
        height,
    }: {
        x?: number;
        y?: number;
        angle?: number;
        width?: number;
        height?: number;
    }): void {
        this.element.style.left =
            x !== undefined
                ? (x - this.element.clientLeft).toString() + 'px'
                : this.element.style.left;
        this.element.style.top =
            y !== undefined
                ? (y - this.element.clientTop).toString() + 'px'
                : this.element.style.top;
        this.element.style.rotate =
            angle !== undefined ? angle + 'deg' : this.element.style.rotate;
        this.element.style.width =
            width !== undefined ? width + 'px' : this.element.style.width;
        this.element.style.height =
            height !== undefined ? height + 'px' : this.element.style.height;
    }

    public getDimension() {
        return {
            x: this.element.offsetLeft,
            y: this.element.offsetTop,
            angle: this.getCurrentRotation(),
            width: this.element.clientWidth,
            height: this.element.clientHeight,
            ratio: this.element.clientWidth / this.element.clientHeight,
        };
    }

    /**
     * Get current angle of current element in degrees
     * @returns angle in degrees
     */
    private getCurrentRotation() {
        if (!this.element) return 0;
        var st = window.getComputedStyle(this.element, null);
        var tm =
            st.getPropertyValue('-webkit-transform') ||
            st.getPropertyValue('-moz-transform') ||
            st.getPropertyValue('-ms-transform') ||
            st.getPropertyValue('-o-transform') ||
            st.getPropertyValue('transform');
        ('none');
        if (tm != 'none') {
            var values = tm.split('(')[1].split(')')[0].split(',');
            var angle = Math.round(
                Math.atan2(Number(values[1]), Number(values[0])) *
                    (180 / Math.PI)
            );
            return angle < 0 ? angle + 360 : angle;
        }
        return 0;
    }
}

export default WElement;
