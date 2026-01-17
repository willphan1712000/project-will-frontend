import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ImageEditor.styles';
import { Transform, Button, Canvas } from '@';

interface Props {
    src?: string;
    setSrc?: (src?: string) => void;
    isOpen?: boolean;
    setOpen?: (open: boolean) => void;
    isNew: boolean;
}

/**
 * Image Editor component. This provides
 * - Image transformation such as dragging, scaling, rotating
 * - Color editing, contrast, ...
 * - ...
 *
 * @param src source of an image to edit
 * @param setSrc modify source state
 * @param isOpen boolean open state of edit pannel
 * @param setSrc modify open state
 * @param isNew boolean - a random state that signals whether there is a new image that has been chosen. Toggle between true and false
 *
 * HOW IT WORKS
 * - Use useMemo to memorize src value across renders until isNew changes. Also reset transformState to undefined, telling there is a new image that needs to be edited as new
 * - When isOpen changes, it can either initialize a transform object on already rendered elements (that can either receive its previous state if exists or be reset as new) or set transform object to undefined.
 * - When hitting Accept button, it uses handleCanvasToSrc function to draw current image src along with current transform state on a canvas, ready to extract a new image url from it. Then new src state value will be set and component re-renders
 * - When hitting cancel button, it changes isOpen state
 * - When hitting reset button, it runs reset method on transform object state
 */
const ImageEditor = ({
    src,
    setSrc = () => {},
    isOpen = false,
    setOpen = () => {},
    isNew = false,
}: Props) => {
    const frame = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const img = useRef<HTMLImageElement>(null);

    const [transform, setTransform] = useState<Transform | undefined>(
        undefined
    );

    const transformState = useRef<
        { x: number; y: number; angle: number; w: number } | undefined
    >(undefined);
    const originalSrc = useMemo(() => {
        transformState.current = undefined;
        return src;
    }, [isNew]);

    async function createTransform() {
        if (!frame.current || !wrapper.current || !img.current) return;

        const transform = new Transform(wrapper.current, frame.current);
        await transform.initialize();

        if (transformState.current) {
            transform.setState(transformState.current);
        } else {
            transform.reset();
        }

        setTransform(transform);
    }

    function handleCanvasToSrc() {
        if (!frame.current || !wrapper.current || !img.current || !transform)
            return;

        const canvasInstance = new Canvas();
        const { canvas, context } = canvasInstance.createCanvas(700, 700);
        const { x, y, angle } = transform.exportData();
        transformState.current = transform.exportData();

        const { src } = canvasInstance.drawImage(
            img.current,
            context,
            x,
            y,
            1,
            angle,
            canvas,
            frame.current.clientWidth,
            frame.current.clientHeight
        );

        return src;
    }

    function handleAccept() {
        setSrc(handleCanvasToSrc());
        setOpen(false);
    }

    function handleCancel() {
        setOpen(false);
    }

    function handleReset() {
        if (!transform) return;
        transform.reset();
    }

    useEffect(() => {
        isOpen ? createTransform() : setTransform(undefined);
    }, [isOpen]);

    if (!isOpen) return;

    return (
        <div style={styles.imageEditor}>
            <p>Drag, Zoom, or Rotate image</p>
            <div ref={frame} style={styles.frame}>
                <div ref={wrapper} style={styles.wrapper}>
                    <img src={originalSrc} style={styles.img} ref={img} />
                </div>
            </div>
            <div style={styles.buttons}>
                <Button
                    buttonType="solid"
                    content="Accept"
                    onClick={handleAccept}
                />
                <Button
                    buttonType="solid"
                    content="Cancel"
                    onClick={handleCancel}
                />
                <Button
                    buttonType="solid"
                    content="Reset"
                    onClick={handleReset}
                />
            </div>
        </div>
    );
};

export default ImageEditor;
