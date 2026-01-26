import { useEffect, useState } from 'react';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import styles from './MainElements.styles';
import TransformOperation from '@/src/utilities/Transform/TransformOperation';
import WMouseEvent from '@/src/utilities/Transform/Events/MouseEvents';
import WTouchEvent from '@/src/utilities/Transform/Events/TouchEvents';

interface Props {
    refs: {
        container: React.RefObject<HTMLDivElement | null>;
        frame: React.RefObject<HTMLDivElement | null>;
        img: React.RefObject<HTMLImageElement | null>;
        controller: React.RefObject<HTMLDivElement | null>;
        topLeft: React.RefObject<HTMLDivElement | null>;
        topRight: React.RefObject<HTMLDivElement | null>;
        bottomLeft: React.RefObject<HTMLDivElement | null>;
        bottomRight: React.RefObject<HTMLDivElement | null>;
        rotate: React.RefObject<HTMLDivElement | null>;
    };
    originalSrc?: string;
    transformOperation: TransformOperation;
}

/**
 * Implement all main elements for image editor
 * - The container element creates root coordinates to all other elements
 */
const MainElements = ({ refs, originalSrc, transformOperation }: Props) => {
    const mouseEvent = new WMouseEvent(transformOperation);
    const touchEvent = new WTouchEvent(transformOperation);

    const [topLeft, settopLeft] = useState<boolean>(false);
    const [topRight, settopRight] = useState<boolean>(false);
    const [bottomLeft, setbottomLeft] = useState<boolean>(false);
    const [bottomRight, setbottomRight] = useState<boolean>(false);
    const [rotate, setRotate] = useState<boolean>(false);

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
        <div ref={refs.container} style={styles.container}>
            <div ref={refs.frame} style={styles.frame}>
                <img src={originalSrc} style={styles.img} ref={refs.img} />
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

                <div
                    ref={refs.rotate}
                    style={
                        rotate
                            ? { ...styles.rotate, ...styles.resizeDown }
                            : styles.rotate
                    }
                    onMouseDown={(e) => {
                        setRotate(true);
                        mouseEvent.rotate(e);
                    }}
                    onTouchStart={(e) => {
                        setRotate(true);
                        touchEvent.rotate(e);
                    }}
                >
                    <div style={handleBackground(rotate)}></div>
                    <FaArrowRotateLeft size="15" />
                </div>
            </div>
        </div>
    );
};

export default MainElements;
