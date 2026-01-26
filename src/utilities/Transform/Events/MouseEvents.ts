import TransformOperation from '../TransformOperation';
import IWEvent from './IWEvent';
import { LinearAlgebra } from '@';

export default class WMouseEvent implements IWEvent {
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

        const onMouseMove = (event: MouseEvent) => {
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
    resize(
        e: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>,
        {
            topLeft = false,
            topRight = false,
            bottomLeft = false,
            bottomRight = false,
        }: {
            topLeft?: boolean;
            topRight?: boolean;
            bottomLeft?: boolean;
            bottomRight?: boolean;
        }
    ): void {
        e.stopPropagation();

        const controller = new AbortController();

        const minWidth = 40;
        const minHeight = 40;

        const {
            x: initX,
            y: initY,
            angle: initRotate,
            width: initW,
            height: initH,
            ratio,
        } = this.transformOperation.getDimension();

        let mousePressX = e.clientX;
        let mousePressY = e.clientY;

        let initRadians = (initRotate * Math.PI) / 180;
        let cosAlpha = Math.cos(initRadians);
        let sinAlpha = Math.sin(initRadians);

        // assume bottomRight, coordinates at the center
        const initCenter = [0.5 * initW, 0.5 * initH];

        const transformCenter = LinearAlgebra.rotateVector(
            initCenter,
            initRadians
        );

        const onMouseMove = (event: MouseEvent) => {
            let dx = event.clientX - mousePressX;
            let dy = event.clientY - mousePressY;

            const dr =
                (dx * transformCenter[0] + dy * transformCenter[1]) /
                Math.sqrt(
                    transformCenter[0] * transformCenter[0] +
                        transformCenter[1] * transformCenter[1]
                ); // dot product formula

            const dw = (dr * initW) / Math.sqrt(initW * initW + initH * initH);
            const dh = (dr * initH) / Math.sqrt(initW * initW + initH * initH);

            const newW = initW + dw;
            const newH = initH + dh;

            const newTransformCenter = [
                transformCenter[0] + 0.5 * dw,
                transformCenter[1] + 0.5 * dh,
            ];

            const newCenter = LinearAlgebra.rotateVector(
                newTransformCenter,
                -initRadians
            );

            const newX = initX + 0.5 * initW + 0.5 * dw - newCenter[0];
            const newY = initY + 0.5 * initH + 0.5 * dh - newCenter[1];

            this.transformOperation.setDimension({
                x: newX,
                y: newY,
                width: newW,
                height: newH,
            });
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
}
