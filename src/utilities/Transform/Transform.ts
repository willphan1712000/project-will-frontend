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
 * Transform is responsible for correctly setting dimension and side effect for editor
 * - Intialize state
 * - Get state
 * - Set state
 * - Reset state
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
        this.rotate = new WElement(rotate, (element) => {
            // This function is responsible for handling element going off the screen by moving it to the oppiste side if it disappears from the screen
            const rotateAlias = element.nextElementSibling as HTMLElement;

            const callback = (entries: any) => {
                entries.forEach((entry: any) => {
                    if (!entry.isIntersecting) {
                        element.style.top = 'auto';
                        element.style.bottom = '-50px';
                        this.transformOperation.setSideEffectState(true);
                    } else {
                        element.style.bottom = 'auto';
                        element.style.top = '-50px';
                        this.transformOperation.setSideEffectState(false);
                    }
                });
            };

            const observer = new IntersectionObserver(callback, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            });

            observer.observe(rotateAlias);
        });

        this.transformOperation = transformOperation;
    }

    public initialize(): Transform {
        this.container.setPosition('relative'); // origin coordinates for
        this.controller.setPosition('absolute'); // this

        this.frame.setPosition('relative'); // origin coordinates for
        this.img.setPosition('absolute'); // this

        const { x, y, width, height } = this.container.getDimension(); // get origin relative to the viewport
        this.transformOperation.setOrigin({ x, y, width, height }); // set origin

        this.transformOperation.subscribe(this.controller); // register controller to transform operation
        this.transformOperation.subscribe(this.img); // register img to transform operation
        this.transformOperation.subscribeSideEffect(this.rotate); // register rotate button as side effect element
        this.transformOperation.runSideEffectHandler();

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
}
