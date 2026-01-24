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
    }

    public initialize(): Transform {
        this.container.setPosition('relative'); // origin coordinates for
        this.controller.setPosition('absolute'); // this

        this.frame.setPosition('relative'); // origin coordinates for
        this.img.setPosition('absolute'); // this

        this.transformOperation.subscribe(this.img);
        this.transformOperation.subscribe(this.controller);

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
        const { x, y, width, height } = this.frame.getDimension();
        const { height: imgHeight, ratio } = this.img.getDimension();

        this.transformOperation.setDimension({
            x,
            y: y + height / 2 - imgHeight / 2,
            angle: 0,
            width,
            height: width / ratio,
        });

        return this;
    }

    public transform(): Transform {
        return this;
    }

    public cleanup(): Transform {
        return this;
    }
}
