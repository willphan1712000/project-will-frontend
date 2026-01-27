import { IWElement } from './WElement';

export default class TransformOperationExtension {
    private xOrigin: number = 0;
    private yOrigin: number = 0;
    private wOrigin: number = 0;
    private hOrigin: number = 0;
    private isSideEffect: boolean = false;
    private sideEffectList: IWElement[] = [];

    subscribeSideEffect(element: IWElement): void {
        this.sideEffectList.push(element);
    }

    runSideEffectHandler(): void {
        this.sideEffectList.forEach((element) => {
            element.runSideEffectHandler();
        });
    }

    setSideEffectState(value: boolean = false) {
        this.isSideEffect = value;
    }

    getSideEffectState() {
        return this.isSideEffect;
    }

    setOrigin({
        x,
        y,
        width,
        height,
    }: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void {
        this.xOrigin = x;
        this.yOrigin = y;
        this.wOrigin = width;
        this.hOrigin = height;
    }

    getOrigin(): { x: number; y: number; width: number; height: number } {
        return {
            x: this.xOrigin,
            y: this.yOrigin,
            width: this.wOrigin,
            height: this.hOrigin,
        };
    }
}
