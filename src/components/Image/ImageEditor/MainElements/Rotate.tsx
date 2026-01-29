import { useEffect, useState } from 'react';

import styles from './MainElements.styles';
import useMyContext from '../context';
import WMouseEvent from '@/src/utilities/Transform/Events/MouseEvents';
import WTouchEvent from '@/src/utilities/Transform/Events/TouchEvents';
import { FaArrowRotateLeft } from 'react-icons/fa6';

const Rotate = () => {
    const [rotate, setRotate] = useState<boolean>(false);

    const { transformOperation, refs } = useMyContext();

    const mouseEvent = new WMouseEvent(transformOperation);
    const touchEvent = new WTouchEvent(transformOperation);

    const { angle } = transformOperation.getDimension();

    const handleBackground = (value: boolean) => {
        return value ? styles.buttonBackgroundDown : styles.buttonBackground;
    };

    useEffect(() => {
        const controller = new AbortController();

        const handler = () => {
            setRotate(false);
        };

        window.addEventListener(
            'mouseup',
            () => {
                handler();
            },
            { signal: controller.signal }
        );
        window.addEventListener(
            'touchend',
            () => {
                handler();
            },
            { signal: controller.signal }
        );

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <div
                ref={refs.rotate}
                style={
                    rotate
                        ? { ...styles.rotate, ...styles.resizeDown }
                        : styles.rotate
                }
                onMouseDown={(e) => {
                    setRotate(true);
                    mouseEvent.rotate(e, { top: true });
                }}
                onTouchStart={(e) => {
                    setRotate(true);
                    touchEvent.rotate(e, { top: true });
                }}
            >
                <div style={handleBackground(rotate)}></div>
                <FaArrowRotateLeft size="15" />
                {rotate && (
                    <p
                        style={{
                            ...styles.label,
                            rotate: `${-angle.toFixed(0)}deg`,
                        }}
                    >
                        {angle.toFixed(0)}°
                    </p>
                )}
            </div>
            <div
                ref={refs.rotateBottom}
                style={
                    rotate
                        ? { ...styles.rotateBottom, ...styles.resizeDown }
                        : { ...styles.rotateBottom }
                }
                onMouseDown={(e) => {
                    setRotate(true);
                    mouseEvent.rotate(e, { bottom: true });
                }}
                onTouchStart={(e) => {
                    setRotate(true);
                    touchEvent.rotate(e, { bottom: true });
                }}
            >
                <div style={handleBackground(rotate)}></div>
                <FaArrowRotateLeft size="15" />
                {rotate && (
                    <p
                        style={{
                            ...styles.label,
                            top: 'auto',
                            bottom: '-100px',
                            rotate: `${-angle.toFixed(0)}deg`,
                        }}
                    >
                        {angle.toFixed(0)}°
                    </p>
                )}
            </div>
        </>
    );
};

export default Rotate;
