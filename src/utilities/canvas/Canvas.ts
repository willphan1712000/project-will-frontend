interface CanvasInterface {
    /**
     * Create a canvas
     * @param number width of canvas
     * @param number height of canvas
     */
    createCanvas(
        width: number,
        height: number
    ): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D };

    /**
     * draw an image on canvas
     */
    drawImage(
        e: any,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        scale: number,
        angle: number,
        canvas: HTMLCanvasElement,
        containerWidth: number,
        containerHeight: number
    ): {
        context: CanvasRenderingContext2D;
        src: string;
    };

    /**
     * Draw a color on canvas
     */
    drawColor(
        type: string,
        color: string,
        ctx: CanvasRenderingContext2D,
        width: number,
        ratio: number
    ): [CanvasRenderingContext2D, string];
}

export default class Canvas implements CanvasInterface {
    public createCanvas(
        width: number,
        height: number
    ): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.width = width;
        canvas.height = height;
        return {
            canvas,
            context,
        };
    }

    public drawImage(
        e: HTMLImageElement,
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        scale: number,
        angle: number,
        canvas: HTMLCanvasElement,
        containerWidth: number,
        containerHeight: number
    ): {
        context: CanvasRenderingContext2D;
        src: string;
    } {
        const ratioX = canvas.width / containerWidth;
        const ratioY = canvas.height / containerHeight;
        let finalX = x * ratioX;
        let finalY = y * ratioY;
        let midleWidth = e.width * ratioX;
        let midleHeight = e.height * ratioY;
        let finalWidth = e.width * ratioX * scale;
        let finalHeight = e.height * ratioY * scale;

        ctx.save();
        ctx.translate(finalX + midleWidth / 2, finalY + midleHeight / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(
            e,
            -finalWidth / 2,
            -finalHeight / 2,
            finalWidth,
            finalHeight
        );
        ctx.restore();
        const src = ctx.canvas.toDataURL();
        const srcEncoded = src.split(',')[1];
        return {
            context: ctx,
            src: src,
        };
    }

    public drawColor(
        type: string,
        color: string,
        ctx: CanvasRenderingContext2D,
        width: number,
        ratio: number
    ): [CanvasRenderingContext2D, string] {
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
            const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
            gradient.addColorStop(percent1 / 100, color1);
            gradient.addColorStop(percent2 / 100, color2);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, width * ratio);
            const srcEncoded = ctx.canvas.toDataURL().split(',')[1];
            return [ctx, srcEncoded];
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            const srcEncoded = ctx.canvas.toDataURL().split(',')[1];
            return [ctx, srcEncoded];
        }
    }
}
