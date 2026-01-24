import { IWElement } from './WElement';

interface IWEvent {
    drag(e: any, transformOperation: IWElement): void;
    rotate(e: any, transformOperation: IWElement): void;
    resize(e: any, transformOperation: IWElement): void;
}

export class WMouseEvent implements IWEvent {
    drag(e: MouseEvent, transformOperation: IWElement): void {
        e.preventDefault();
        e.stopPropagation();

        const controler = new AbortController();
        const { x: initX, y: initY } = transformOperation.getDimension();

        let mousePressX = e.clientX;
        let mousePressY = e.clientY;

        const onMouseMove = (event: MouseEvent) => {
            let x = event.clientX;
            let y = event.clientY;
            var posX = initX + (x - mousePressX);
            var posY = initY + (y - mousePressY);
            transformOperation.setDimension({ x: posX, y: posY });
        };

        const onMouseUp = () => {
            controler.abort();
        };

        window.addEventListener('mousemove', onMouseMove, {
            signal: controler.signal,
        });
        window.addEventListener('mouseup', onMouseUp, {
            signal: controler.signal,
        });
    }

    rotate(e: MouseEvent, transformOperation: IWElement): void {
        throw new Error('Method not implemented.');
    }
    resize(e: MouseEvent, transformOperation: IWElement): void {
        throw new Error('Method not implemented.');
    }
}

export class WTouchEvent implements IWEvent {
    drag(e: TouchEvent, transformOperation: IWElement): void {
        throw new Error('Method not implemented.');
    }
    rotate(e: TouchEvent, transformOperation: IWElement): void {
        throw new Error('Method not implemented.');
    }
    resize(e: TouchEvent, transformOperation: IWElement): void {
        throw new Error('Method not implemented.');
    }
}
