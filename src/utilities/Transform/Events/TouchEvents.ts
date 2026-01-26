import TransformOperation from '../TransformOperation';
import IWEvent from './IWEvent';

export default class WTouchEvent implements IWEvent {
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
    resize(
        e: TouchEvent | React.TouchEvent<HTMLElement>,
        options: {
            topLeft?: boolean;
            topRight?: boolean;
            bottomLeft?: boolean;
            bottomRight?: boolean;
        }
    ): void {
        // e.stopPropagation();
        // const controller = new AbortController()
        // const minWidth = 40;
        // const minHeight = 40;
        // const {x: initX, y: initY, angle: initRotate, width: initW, height: initH, ratio} = this.transformOperation.getDimension()
        // const {x: xOrigin, y: yOrigin} = this.transformOperation.getOrigin()
        // let mousePressX = e.touches[0].clientX;
        // let mousePressY = e.touches[0].clientY;
        // let initRadians = (initRotate * Math.PI) / 180;
        // let cosFraction = Math.cos(initRadians);
        // let sinFraction = Math.sin(initRadians);
        // let vectorC = [
        //     mousePressX - initX - xOrigin,
        //     mousePressY - initY - yOrigin,
        // ];
        // const onTouchMove = (event: TouchEvent) => {
        //     let x = event.touches[0].clientX;
        //     let y = event.touches[0].clientY;
        //     let wDiff = x - mousePressX;
        //     let hDiff = y - mousePressY;
        //     let vectorD = [wDiff, hDiff];
        //     const c =
        //         (vectorC[0] * vectorD[0] + vectorC[1] * vectorD[1]) /
        //         (vectorC[0] * vectorC[0] + vectorC[1] * vectorC[1]);
        //     let vectorH = [c * vectorC[0], c * vectorC[1]];
        //     // let rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
        //     // let rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;
        //     let rotatedWDiff =
        //         cosFraction * vectorH[0] + sinFraction * vectorH[1];
        //     let rotatedHDiff =
        //         cosFraction * vectorH[1] - sinFraction * vectorH[0];
        //     rotatedHDiff =
        //         rotatedHDiff * rotatedWDiff > 0
        //             ? rotatedWDiff / ratio
        //             : -rotatedWDiff / ratio;
        //     let newW = initW,
        //         newH = initH,
        //         newX = initX,
        //         newY = initY;
        //     if (options.xResize) {
        //         if (options.left) {
        //             newW = initW - rotatedWDiff;
        //             if (newW < minWidth) {
        //                 newW = minWidth;
        //                 rotatedWDiff = initW - minWidth;
        //             }
        //         } else {
        //             newW = initW + rotatedWDiff;
        //             if (newW < minWidth) {
        //                 newW = minWidth;
        //                 rotatedWDiff = minWidth - initW;
        //             }
        //         }
        //         newX += 0.5 * rotatedWDiff * cosFraction;
        //         newY += 0.5 * rotatedWDiff * sinFraction;
        //     }
        //     if (options.yResize) {
        //         if (options.top) {
        //             newH = initH - rotatedHDiff;
        //             if (newH < minHeight) {
        //                 newH = minHeight;
        //                 rotatedHDiff = initH - minHeight;
        //             }
        //         } else {
        //             newH = initH + rotatedHDiff;
        //             if (newH < minHeight) {
        //                 newH = minHeight;
        //                 rotatedHDiff = minHeight - initH;
        //             }
        //         }
        //         newX -= 0.5 * rotatedHDiff * sinFraction;
        //         newY += 0.5 * rotatedHDiff * cosFraction;
        //     }
        //     this.transformOperation.setDimension({ x: newX, y: newY, width: newW, height: newH })
        // };
        // const onTouchEnd = () => {
        //     controller.abort()
        // }
        // window.addEventListener('touchmove', onTouchMove, { signal: controller.signal })
        // window.addEventListener('touchend', onTouchEnd, { signal: controller.signal })
    }
}
