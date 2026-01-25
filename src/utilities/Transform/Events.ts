import TransformOperation from './TransformOperation';

interface IWEvent {
    drag(
        e:
            | MouseEvent
            | React.MouseEvent<HTMLElement, MouseEvent>
            | TouchEvent
            | React.TouchEvent<HTMLElement>
    ): void;
    rotate(
        e:
            | MouseEvent
            | React.MouseEvent<HTMLElement, MouseEvent>
            | TouchEvent
            | React.TouchEvent<HTMLElement>
    ): void;
    resize(
        e:
            | MouseEvent
            | React.MouseEvent<HTMLElement, MouseEvent>
            | TouchEvent
            | React.TouchEvent<HTMLElement>
    ): void;
}

class WMouseEvent implements IWEvent {
    private transformOperation: TransformOperation;

    constructor(transformOperation: TransformOperation) {
        this.transformOperation = transformOperation;
    }

    drag(e: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>): void {
        e.stopPropagation();
        const controller = new AbortController();
        const { x: initX, y: initY } = this.transformOperation.getDimension();

        let mousePressX = e.clientX;
        let mousePressY = e.clientY;

        const onMouseMove = (event: MouseEvent) => {
            let x = event.clientX;
            let y = event.clientY;
            let posX = initX + (x - mousePressX);
            let posY = initY + (y - mousePressY);
            this.transformOperation.setDimension({ x: posX, y: posY });
        };

        const onMouseUp = () => {
            controller.abort();
        };

        window.addEventListener('mousemove', onMouseMove, {
            signal: controller.signal,
        });
        window.addEventListener('mouseup', onMouseUp, {
            signal: controller.signal,
        });
    }

    rotate(e: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>): void {
        e.stopPropagation();
        const controller = new AbortController();

        const { x, y, width, height } = this.transformOperation.getDimension();

        // Find center of the element
        let centerX = x + width / 2;
        let centerY = y + height / 2;

        // Get origin
        const { x: xOrigin, y: yOrigin } = this.transformOperation.getOrigin();

        // const compensation = this.isRotateOffScreen ? 180 : 0;
        const compensation = false ? 180 : 0; // hardcoded

        const onMouseMove = (event: any) => {
            let x = event.clientX - xOrigin;
            let y = event.clientY - yOrigin;
            let angle = Math.atan2(y - centerY, x - centerX) + Math.PI / 2; // calculate angle (radian). angle = tan-1(y / x)
            angle *= 180 / Math.PI; // convert to degree
            angle += compensation;
            this.transformOperation.setDimension({ angle });
        };

        const onMouseUp = () => {
            controller.abort();
        };

        window.addEventListener('mousemove', onMouseMove, {
            signal: controller.signal,
        });
        window.addEventListener('mouseup', onMouseUp, {
            signal: controller.signal,
        });
    }
    resize(e: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>): void {
        e.stopPropagation();
        throw new Error('Method not implemented.');
    }
}

class WTouchEvent implements IWEvent {
    private transformOperation: TransformOperation;

    constructor(transformOperation: TransformOperation) {
        this.transformOperation = transformOperation;
    }

    drag(e: TouchEvent | React.TouchEvent<HTMLElement>): void {
        e.stopPropagation();

        const controller = new AbortController();
        const { x: initX, y: initY } = this.transformOperation.getDimension();

        let mousePressX = e.touches[0].clientX;
        let mousePressY = e.touches[0].clientY;

        const onTouchMove = (event: TouchEvent) => {
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            let posX = initX + (x - mousePressX);
            let posY = initY + (y - mousePressY);
            this.transformOperation.setDimension({ x: posX, y: posY });
        };

        const onTouchEnd = () => {
            controller.abort();
        };

        window.addEventListener('touchmove', onTouchMove, {
            signal: controller.signal,
            passive: true,
        });
        window.addEventListener('touchend', onTouchEnd, {
            signal: controller.signal,
        });
    }
    rotate(e: TouchEvent | React.TouchEvent<HTMLElement>): void {
        e.stopPropagation();

        const controller = new AbortController();

        const { x, y, width, height } = this.transformOperation.getDimension();

        // Find center of the element
        let centerX = x + width / 2;
        let centerY = y + height / 2;

        // Get origin
        const { x: xOrigin, y: yOrigin } = this.transformOperation.getOrigin();

        // const compensation = this.isRotateOffScreen ? 180 : 0;
        const compensation = false ? 180 : 0; // hardcoded

        const onTouchMove = (event: TouchEvent) => {
            let x = event.touches[0].clientX - xOrigin;
            let y = event.touches[0].clientY - yOrigin;
            let angle = Math.atan2(y - centerY, x - centerX) + Math.PI / 2; // calculate angle (radian). angle = tan-1(y / x)
            angle *= 180 / Math.PI; // convert to degree
            angle += compensation;
            this.transformOperation.setDimension({ angle });
        };

        const onTouchEnd = () => {
            controller.abort();
        };

        window.addEventListener('touchmove', onTouchMove, {
            signal: controller.signal,
        });
        window.addEventListener('touchend', onTouchEnd, {
            signal: controller.signal,
        });
    }
    resize(e: TouchEvent | React.TouchEvent<HTMLElement>): void {
        e.stopPropagation();
        throw new Error('Method not implemented.');
    }
}

const Events = {
    WMouseEvent,
    WTouchEvent,
};

export default Events;
