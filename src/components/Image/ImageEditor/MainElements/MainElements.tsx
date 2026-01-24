import { useEffect, useState } from 'react';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import styles from './MainElements.styles';

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
}

/**
 * Implement all main elements for image editor
 * - The container element creates root coordinates to all other elements
 * - Mousedown event and Mouseup event are using true capture so that these elements are applied before the controller being dragged. the controller later on will also apply true capture for this purpose
 */
const MainElements = ({ refs, originalSrc }: Props) => {
    const [topLeft, settopLeft] = useState<boolean>(false);
    const [topRight, settopRight] = useState<boolean>(false);
    const [bottomLeft, setbottomLeft] = useState<boolean>(false);
    const [bottomRight, setbottomRight] = useState<boolean>(false);

    const handleEvent = (
        e:
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.TouchEvent<HTMLDivElement>,
        func: void
    ) => {
        e.stopPropagation();
        func;
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
            <div ref={refs.controller} style={styles.controller}>
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
                    onMouseDownCapture={(e) => handleEvent(e, settopLeft(true))}
                    onTouchStartCapture={(e) =>
                        handleEvent(e, settopLeft(true))
                    }
                >
                    <div style={topLeft ? styles.buttonBackground : {}}></div>
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
                    onMouseDownCapture={(e) =>
                        handleEvent(e, settopRight(true))
                    }
                    onTouchStartCapture={(e) =>
                        handleEvent(e, settopRight(true))
                    }
                >
                    <div style={topRight ? styles.buttonBackground : {}}></div>
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
                    onMouseDownCapture={(e) =>
                        handleEvent(e, setbottomLeft(true))
                    }
                    onTouchStartCapture={(e) =>
                        handleEvent(e, setbottomLeft(true))
                    }
                >
                    <div
                        style={bottomLeft ? styles.buttonBackground : {}}
                    ></div>
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
                    onMouseDownCapture={(e) =>
                        handleEvent(e, setbottomRight(true))
                    }
                    onTouchStartCapture={(e) =>
                        handleEvent(e, setbottomRight(true))
                    }
                >
                    <div
                        style={bottomRight ? styles.buttonBackground : {}}
                    ></div>
                </div>

                <div ref={refs.rotate} style={styles.rotate}>
                    <FaArrowRotateLeft />
                </div>
            </div>
        </div>
    );
};

export default MainElements;
