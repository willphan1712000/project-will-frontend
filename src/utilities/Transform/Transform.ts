import { WMouseEvent, WTouchEvent } from './Events';
import TransformOperation from './TransformOperation';
import WElement, { IWElement } from './WElement';

interface Props {
    container: HTMLElement;
    frame: HTMLElement;
    img: HTMLImageElement;
    controller: HTMLElement;
    topLeft: HTMLElement;
    topRight: HTMLElement;
    bottomLeft: HTMLElement;
    bottomRight: HTMLElement;
    rotate: HTMLElement;
    transformOperation: TransformOperation;
}

/**
 * Transform entity takes all these properties to perform smoothly
 */
export default class Transform {
    private frame: IWElement;
    private img: IWElement;

    private container: IWElement;
    private controller: IWElement;
    private topLeft: IWElement;
    private topRight: IWElement;
    private bottomLeft: IWElement;
    private bottomRight: IWElement;
    private rotate: IWElement;

    private transformOperation: TransformOperation;
    private abortController: AbortController;

    constructor({
        container,
        frame,
        img,
        controller,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        rotate,
        transformOperation,
    }: Props) {
        this.frame = new WElement(frame);
        this.img = new WElement(img);

        this.container = new WElement(container);
        this.controller = new WElement(controller);
        this.topLeft = new WElement(topLeft);
        this.topRight = new WElement(topRight);
        this.bottomLeft = new WElement(bottomLeft);
        this.bottomRight = new WElement(bottomRight);
        this.rotate = new WElement(rotate);

        this.transformOperation = transformOperation;
        this.abortController = new AbortController();
    }

    public initialize(): Transform {
        this.container.setPosition('relative'); // origin coordinates for
        this.controller.setPosition('absolute'); // this

        this.frame.setPosition('relative'); // origin coordinates for
        this.img.setPosition('absolute'); // this

        this.transformOperation.subscribe(this.controller); // register controller to transform operation
        this.transformOperation.subscribe(this.img); // register img to transform operation

        this.transform(); // perform transform

        return this;
    }

    public setState({
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
    }) {
        this.transformOperation.setDimension({ x, y, angle, width, height });
    }

    public getState() {
        return this.transformOperation.getDimension();
    }

    public reset(): Transform {
        const { width } = this.frame.getDimension();
        const { ratio } = this.img.getDimension();

        this.transformOperation.setDimension({
            x: 0,
            y: width / 2 - width / ratio / 2,
            angle: 0,
            width,
            height: width / ratio,
        });

        return this;
    }

    public transform(): Transform {
        this.transformOperation.addEventListener(
            'mousedown',
            (e) => new WMouseEvent().drag(e, this.transformOperation),
            { signal: this.abortController.signal, capture: true }
        );

        // this.transformOperation.addEventListener('touchstart', e => (new WTouchEvent).drag(e, this.transformOperation), { signal: this.abortController.signal })

        return this;
    }

    public cleanup(): Transform {
        this.abortController.abort();
        return this;
    }
}
