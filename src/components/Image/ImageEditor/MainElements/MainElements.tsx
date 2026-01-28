import WMouseEvent from '@/src/utilities/Transform/Events/MouseEvents';
import WTouchEvent from '@/src/utilities/Transform/Events/TouchEvents';
import { useEffect, useState } from 'react';
import useMyContext from '../context';
import styles from './MainElements.styles';
import Rotate from './Rotate';

/**
 * Implement all main elements for image editor
 * - The container element creates root coordinates to all other elements
 */
const MainElements = () => {
    const {
        refs,
        imgRefs,
        src: originalSrc,
        transformOperation,
    } = useMyContext();
    const mouseEvent = new WMouseEvent(transformOperation);
    const touchEvent = new WTouchEvent(transformOperation);

    const [topLeft, settopLeft] = useState<boolean>(false);
    const [topRight, settopRight] = useState<boolean>(false);
    const [bottomLeft, setbottomLeft] = useState<boolean>(false);
    const [bottomRight, setbottomRight] = useState<boolean>(false);
    const [reRender, triggierReRender] = useState<boolean>(false);

    const { angle, width, height } = transformOperation.getDimension();

    const handleBackground = (value: boolean) => {
        return value ? styles.buttonBackgroundDown : styles.buttonBackground;
    };

    useEffect(() => {
        const controller = new AbortController();

        const handler = () => {
            settopLeft(false);
            settopRight(false);
            setbottomLeft(false);
            setbottomRight(false);
        };

        window.addEventListener(
            'mousemove',
            () => {
                triggierReRender((prev) => !prev);
            },
            { signal: controller.signal }
        );
        window.addEventListener(
            'touchmove',
            () => {
                triggierReRender((prev) => !prev);
            },
            { signal: controller.signal }
        );
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
    }, [reRender]);

    return (
        <div ref={refs.container} style={styles.container}>
            <div ref={refs.frame} style={styles.frame}>
                <img src={originalSrc} style={styles.img} ref={imgRefs.img} />
            </div>
            <div
                style={styles.controller}
                ref={refs.controller}
                onMouseDown={(e) => mouseEvent.drag(e)}
                onTouchStart={(e) => touchEvent.drag(e)}
            >
                <div
                    ref={refs.topLeft}
                    style={
                        topLeft
                            ? {
                                  ...styles.topLeft,
                                  ...styles.resizeDown,
                              }
                            : styles.topLeft
                    }
                    onMouseDown={(e) => {
                        settopLeft(true);
                        mouseEvent.resize(e, {
                            topLeft: true,
                        });
                    }}
                    onTouchStart={(e) => {
                        settopLeft(true);
                        touchEvent.resize(e, {
                            topLeft: true,
                        });
                    }}
                >
                    <div style={handleBackground(topLeft)}></div>
                </div>

                <div
                    ref={refs.topRight}
                    style={
                        topRight
                            ? {
                                  ...styles.topRight,
                                  ...styles.resizeDown,
                              }
                            : styles.topRight
                    }
                    onMouseDown={(e) => {
                        settopRight(true);
                        mouseEvent.resize(e, {
                            topRight: true,
                        });
                    }}
                    onTouchStart={(e) => {
                        settopRight(true);
                        touchEvent.resize(e, {
                            topRight: true,
                        });
                    }}
                >
                    <div style={handleBackground(topRight)}></div>
                </div>

                <div
                    ref={refs.bottomLeft}
                    style={
                        bottomLeft
                            ? {
                                  ...styles.bottomLeft,
                                  ...styles.resizeDown,
                              }
                            : styles.bottomLeft
                    }
                    onMouseDown={(e) => {
                        setbottomLeft(true);
                        mouseEvent.resize(e, {
                            bottomLeft: true,
                        });
                    }}
                    onTouchStart={(e) => {
                        setbottomLeft(true);
                        touchEvent.resize(e, {
                            bottomLeft: true,
                        });
                    }}
                >
                    <div style={handleBackground(bottomLeft)}></div>
                </div>

                <div
                    ref={refs.bottomRight}
                    style={
                        bottomRight
                            ? {
                                  ...styles.bottomRight,
                                  ...styles.resizeDown,
                              }
                            : styles.bottomRight
                    }
                    onMouseDown={(e) => {
                        setbottomRight(true);
                        mouseEvent.resize(e, {
                            bottomRight: true,
                        });
                    }}
                    onTouchStart={(e) => {
                        setbottomRight(true);
                        touchEvent.resize(e, {
                            bottomRight: true,
                        });
                    }}
                >
                    <div style={handleBackground(bottomRight)}></div>
                </div>

                <Rotate />

                {(topLeft || topRight || bottomLeft || bottomRight) && (
                    <p
                        style={{
                            ...styles.label,
                            rotate: `${-angle.toFixed(0)}deg`,
                        }}
                    >
                        w: {width.toFixed(0)}px, h: {height.toFixed(0)}px
                    </p>
                )}
            </div>
        </div>
    );
};

export default MainElements;
