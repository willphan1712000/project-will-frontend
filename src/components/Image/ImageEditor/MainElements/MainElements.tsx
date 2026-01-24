import { useState } from 'react';
import styles from './MainElements.styles';
import { FaArrowRotateLeft } from 'react-icons/fa6';

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
 */
const MainElements = ({ refs, originalSrc }: Props) => {
    const [topLeft, settopLeft] = useState<boolean>(false);
    const [topRight, settopRight] = useState<boolean>(false);
    const [bottomLeft, setbottomLeft] = useState<boolean>(false);
    const [bottomRight, setbottomRight] = useState<boolean>(false);

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
                    onMouseDown={() => settopLeft(true)}
                    onMouseUp={() => settopLeft(false)}
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
                    onMouseDown={() => settopRight(true)}
                    onMouseUp={() => settopRight(false)}
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
                    onMouseDown={() => setbottomLeft(true)}
                    onMouseUp={() => setbottomLeft(false)}
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
                    onMouseDown={() => setbottomRight(true)}
                    onMouseUp={() => setbottomRight(false)}
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
