import TransformOperation from '../TransformOperation';
import IWEvent from './IWEvent';
import { LinearAlgebra } from '@';

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
            passive: true,
        });
        window.addEventListener('touchend', onTouchEnd, {
            signal: controller.signal,
        });
    }
    resize(
        e: TouchEvent | React.TouchEvent<HTMLElement>,
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

        const {
            x: initX,
            y: initY,
            angle: initAngleDegree,
            width: initW,
            height: initH,
            ratio,
        } = this.transformOperation.getDimension();

        const { x: xOrigin, y: yOrigin } = this.transformOperation.getOrigin();

        let initAngle = (initAngleDegree * Math.PI) / 180;
        const topLeftResizer = [initX, initY, 1];
        const topRightResizer = [initX + initW, initY, 1];
        const bottomLeftResizer = [initX, initY + initH, 1];
        const bottomRightResizer = [initX + initW, initY + initH, 1];

        let p, q; // q is pressed button, p is the opposite button
        if (topLeft) {
            q = topLeftResizer;
            p = bottomRightResizer;
        } else if (topRight) {
            q = topRightResizer;
            p = bottomLeftResizer;
        } else if (bottomLeft) {
            ((q = bottomLeftResizer), (p = topRightResizer));
        } else if (bottomRight) {
            ((q = bottomRightResizer), (p = topLeftResizer));
        } else {
            return;
        }

        // find rotated p
        const rotated_p = LinearAlgebra.NicolasMattia(
            p,
            LinearAlgebra.getMiddleVectorFrom(q, p),
            initAngle
        );

        // find rotated q
        const rotated_q = LinearAlgebra.NicolasMattia(
            q,
            LinearAlgebra.getMiddleVectorFrom(p, q),
            initAngle
        );

        // find rotated diagonal
        const rotated_diagonal = LinearAlgebra.plusVectors(
            rotated_q,
            LinearAlgebra.getOppositeVector(rotated_p)
        );
        const rotated_diagonal_magnitude =
            LinearAlgebra.getVectorMagnitude(rotated_diagonal);

        const onTouchMove = (event: TouchEvent) => {
            // find cursor
            const cursor = [
                event.touches[0].clientX - xOrigin,
                event.touches[0].clientY - yOrigin,
                1,
            ];

            // find actual moved_q
            const moved = LinearAlgebra.plusVectors(
                cursor,
                LinearAlgebra.getOppositeVector(rotated_q)
            );
            // Find dot product
            const moved_projection_coefficient =
                LinearAlgebra.dotProduct(rotated_diagonal, moved) /
                (rotated_diagonal_magnitude * rotated_diagonal_magnitude);
            //
            const moved_projection = LinearAlgebra.setCoefficient(
                moved_projection_coefficient,
                rotated_diagonal
            );
            //
            const moved_q = LinearAlgebra.plusVectors(
                rotated_q,
                moved_projection
            );

            // find new p
            const newP = LinearAlgebra.NicolasMattia(
                rotated_p,
                LinearAlgebra.getMiddleVectorFrom(moved_q, rotated_p),
                -initAngle
            );

            // find q
            const newQ = LinearAlgebra.NicolasMattia(
                moved_q,
                LinearAlgebra.getMiddleVectorFrom(moved_q, rotated_p),
                -initAngle
            );

            // find new WH
            const newWH = LinearAlgebra.plusVectors(
                newQ,
                LinearAlgebra.getOppositeVector(newP)
            );

            // get new width
            let newW = Math.abs(newWH[0]);

            // Check if new width is at limit
            if (newW <= minWidth) {
                newW = minWidth;
                return;
            }

            if (topLeft) {
                this.transformOperation.setDimension({
                    x: newP[0] - newW,
                    y: newP[1] - newW / ratio,
                    width: newW,
                    height: newW / ratio,
                });
            } else if (topRight) {
                this.transformOperation.setDimension({
                    x: newP[0],
                    y: newP[1] - newW / ratio,
                    width: newW,
                    height: newW / ratio,
                });
            } else if (bottomLeft) {
                this.transformOperation.setDimension({
                    x: newP[0] - newW,
                    y: newP[1],
                    width: newW,
                    height: newW / ratio,
                });
            } else if (bottomRight) {
                this.transformOperation.setDimension({
                    x: newP[0],
                    y: newP[1],
                    width: newW,
                    height: newW / ratio,
                });
            } else {
                return;
            }
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
}
