import TransformOperationExtension from './TransformOperationExtension';
import { IWElement } from './WElement';

/**
 * Transform Operation class
 * - Design pattern used here is Composite Pattern
 * - Implement IWElement as group of IWElement
 */
class TransformOperation
    extends TransformOperationExtension
    implements IWElement
{
    private list: IWElement[] = [];

    private x: number = 0;
    private y: number = 0;
    private angle: number = 0;
    private width: number = 0;
    private height: number = 0;

    setPosition(position: 'fixed' | 'relative' | 'absolute' | 'unset'): void {
        this.list.forEach((element) => {
            element.setPosition(position);
        });
    }

    addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void {
        this.list[0].addEventListener(type, listener, options); // this is important, because this is composite component therefore every component will be affected by just one event listener attached to only one component. In this case, we use the first component in the list and therefore we use list[0]
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
        this.x = x !== undefined ? x : this.x;
        this.y = y !== undefined ? y : this.y;
        this.angle = angle !== undefined ? angle : this.angle;
        this.width = width !== undefined ? width : this.width;
        this.height = height !== undefined ? height : this.height;

        this.drag(x, y);
        this.rotate(angle);
        this.resize(width, height);
    }

    getDimension(): {
        x: number;
        y: number;
        angle: number;
        width: number;
        height: number;
        ratio: number;
    } {
        return {
            x: this.x,
            y: this.y,
            angle: this.angle,
            width: this.width,
            height: this.height,
            ratio: this.width / this.height,
        };
    }

    /**
     * Register an HTML Element to the TransformOperation
     * @param element
     */
    subscribe(element: IWElement): void {
        this.list.push(element);
    }

    drag(x?: number, y?: number): void {
        this.list.forEach((element) => {
            element.drag(x, y);
        });
    }
    rotate(angle?: number): void {
        this.list.forEach((element) => {
            element.rotate(angle);
        });
    }
    resize(width?: number, height?: number): void {
        this.list.forEach((element) => {
            element.resize(width, height);
        });
    }
}

export default TransformOperation;
