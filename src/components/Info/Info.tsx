import InfoIcon from '@/src/components/Icons/Info';
import React, { useRef, useState } from 'react';
import styles from './styles';

interface Props {
    options?: {
        color?: string;
        backgroundColor?: string;
    };
    message?: string;
}

let top: React.CSSProperties;
let right: React.CSSProperties;

/**
 * This component helps users see more information when hovering over the component
 * - The popup message will detect if it reaches the top edge of the viewport, it will move to the bottom
 * - The popup message will detect if it reaches the right edge of the viewport, it will move to the left
 *
 * @param message - message from the info component
 * @param options - customize text color, background color
 * @returns Info component
 * @example
 * ```tsx
 * ... component declaration
 *
 * <Info
 *  message="Your message goes here"
 *  options={{
 *      backgroundColor: 'var(--foreground)', color: 'var(--text-color)'
 *  }}
 * />
 * ```
 */
const Info = ({
    message = '',
    options = { color: '#000', backgroundColor: '#f0f0f0' },
}: Props) => {
    const { color, backgroundColor } = options;
    const pRef = useRef<HTMLParagraphElement>(null);
    const [isHover, setHover] = useState<boolean>(false);
    const animate: React.CSSProperties = isHover
        ? {
              visibility: 'visible',
              scale: 1,
          }
        : {
              visibility: 'hidden',
              scale: 0.8,
          };

    if (isHover && pRef.current) {
        const rect = pRef.current.getBoundingClientRect();
        top =
            rect.top <= 0
                ? { top: '100%', bottom: undefined }
                : { bottom: '100%', top: undefined };
        right =
            Math.ceil(rect.right) >= window.innerWidth
                ? { right: '100%', left: undefined }
                : { left: '100%', right: undefined };
    }

    return (
        <div style={styles.container}>
            <InfoIcon
                color={color}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            />
            <p
                ref={pRef}
                style={{
                    ...styles.message,
                    bottom: '100%',
                    left: '100%',
                    visibility: 'hidden',
                }}
            >
                {message}
            </p>
            <p
                style={{
                    ...styles.message,
                    ...animate,
                    ...top,
                    ...right,
                    backgroundColor,
                    color,
                }}
            >
                {message}
            </p>
        </div>
    );
};

export default Info;
