import { LinearAlgebra } from '@';

interface WICanvas {
    drawImage({
        e,
        x,
        y,
        angle,
        width,
        height,
        containerHeight,
        containerWidth,
    }: {
        e: HTMLImageElement;
        x: number;
        y: number;
        angle: number;
        width: number;
        height: number;
        containerWidth: number;
        containerHeight: number;
    }): void;

    drawColor(type: string, color: string, width: number, ratio: number): void;
}

export default class Canvas implements WICanvas {
    private canvas: HTMLCanvasElement;
    private canvas2DContext: CanvasRenderingContext2D;
    private src?: string;

    constructor(width: number, height: number) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;

        this.canvas2DContext = this.canvas.getContext('2d')!;
    }

    get() {
        return {
            canvas: this.canvas,
            context: this.canvas2DContext,
            src: this.src,
        };
    }

    public drawImage({
        e,
        x,
        y,
        angle,
        width,
        height,
        containerHeight,
        containerWidth,
    }: {
        e: HTMLImageElement;
        x: number;
        y: number;
        angle: number;
        width: number;
        height: number;
        containerWidth: number;
        containerHeight: number;
    }) {
        const ratioX = this.canvas.width / containerWidth;
        const ratioY = this.canvas.height / containerHeight;

        const finalX = x * ratioX;
        const finalY = y * ratioY;

        const finalWidth = width * ratioX;
        const finalHeight = height * ratioY;

        const angleRadians = (angle * Math.PI) / 180;

        const reverse_p = LinearAlgebra.rotateVector(
            [finalX, finalY, 1],
            -angleRadians
        );
        const reverse_q = LinearAlgebra.rotateVector(
            [finalX + finalWidth, finalY + finalHeight, 1],
            -angleRadians
        );

        const reverse_p_prime = LinearAlgebra.NicolasMattia(
            reverse_p,
            LinearAlgebra.getMiddleVectorFrom(reverse_p, reverse_q),
            angleRadians
        );

        this.canvas2DContext.save();
        this.canvas2DContext.rotate(angleRadians);
        this.canvas2DContext.drawImage(
            e,
            reverse_p_prime[0],
            reverse_p_prime[1],
            finalWidth,
            finalHeight
        );

        this.src = this.canvas2DContext.canvas.toDataURL();
        this.canvas2DContext.restore();
    }

    public drawColor(
        type: string,
        color: string,
        width: number,
        ratio: number
    ) {
        if (type === '') color = '#ffffff';
        if (type === 'gradient') {
            const breakdownArr = color.split(',');
            var [angle, color1, percent1, color2, percent2] = [
                Number(breakdownArr[0]),
                breakdownArr[1],
                Number(breakdownArr[2]),
                breakdownArr[3],
                Number(breakdownArr[4]),
            ];
            const radians = ((angle - 180) * Math.PI) / 180;
            const x0 =
                width / 2 + (width / 2) * Math.cos(radians - Math.PI / 2);
            const y0 =
                (width * ratio) / 2 +
                ((width * ratio) / 2) * Math.sin(radians - Math.PI / 2);
            const x1 =
                width / 2 - (width / 2) * Math.cos(radians - Math.PI / 2);
            const y1 =
                (width * ratio) / 2 -
                ((width * ratio) / 2) * Math.sin(radians - Math.PI / 2);
            const gradient = this.canvas2DContext.createLinearGradient(
                x0,
                y0,
                x1,
                y1
            );
            gradient.addColorStop(percent1 / 100, color1);
            gradient.addColorStop(percent2 / 100, color2);
            this.canvas2DContext.fillStyle = gradient;
            this.canvas2DContext.fillRect(0, 0, width, width * ratio);
            this.src = this.canvas2DContext.canvas.toDataURL();
        } else {
            this.canvas2DContext.fillStyle = color;
            this.canvas2DContext.fillRect(
                0,
                0,
                this.canvas2DContext.canvas.width,
                this.canvas2DContext.canvas.height
            );
            this.src = this.canvas2DContext.canvas.toDataURL();
        }
    }
}
