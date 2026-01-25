import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ImageEditor.styles';
import { Transform, Button, Canvas } from '@';
import MainElements from './MainElements/MainElements';
import Instruction from './Instruction';
import TransformOperation from '@/src/utilities/Transform/TransformOperation';

const transformOperation = new TransformOperation();

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
    const container = useRef<HTMLDivElement>(null);
    const frame = useRef<HTMLDivElement>(null);
    const img = useRef<HTMLImageElement>(null);

    const controller = useRef<HTMLDivElement>(null);
    const topLeft = useRef<HTMLDivElement>(null);
    const topRight = useRef<HTMLDivElement>(null);
    const bottomLeft = useRef<HTMLDivElement>(null);
    const bottomRight = useRef<HTMLDivElement>(null);
    const rotate = useRef<HTMLDivElement>(null);

    const [transform, setTransform] = useState<Transform | undefined>(
        undefined
    );

    const transformState = useRef<
        { x: number; y: number; angle: number; width: number } | undefined
    >(undefined);
    const originalSrc = useMemo(() => {
        transformState.current = undefined;
        return src;
    }, [isNew]);

    function createTransform() {
        if (!frame.current || !img.current) return;

        const transform = new Transform({
            container: container.current!,
            frame: frame.current!,
            img: img.current!,
            controller: controller.current!,
            topLeft: topLeft.current!,
            topRight: topRight.current!,
            bottomLeft: bottomLeft.current!,
            bottomRight: bottomRight.current!,
            rotate: rotate.current!,
            transformOperation,
        });
        transform.initialize();

        if (transformState.current) {
            transform.setState(transformState.current);
        } else {
            transform.reset();
        }

        setTransform(transform);
    }

    function handleCanvasToSrc() {
        if (!frame.current || !img.current || !transform) return;

        const canvasInstance = new Canvas();
        const { canvas, context } = canvasInstance.createCanvas(700, 700);
        const { x, y, angle, width, height } = transform.getState();
        transformState.current = transform.getState();

        const { src } = canvasInstance.drawImage(
            img.current,
            context,
            x,
            y,
            1,
            angle,
            canvas,
            width,
            height
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

    function handleWindowScroll(isOpen: boolean) {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }

    useEffect(() => {
        isOpen ? createTransform() : setTransform(undefined);
        handleWindowScroll(isOpen);

        return () => {
            setTransform(undefined);
        };
    }, [isOpen]);

    if (!isOpen) return;

    return (
        <div style={styles.imageEditor}>
            <Instruction />
            <MainElements
                refs={{
                    container,
                    frame,
                    img,
                    controller,
                    topLeft,
                    topRight,
                    bottomLeft,
                    bottomRight,
                    rotate,
                }}
                originalSrc={originalSrc}
                transformOperation={transformOperation}
            />

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
