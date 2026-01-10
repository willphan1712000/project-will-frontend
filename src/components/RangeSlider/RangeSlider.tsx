import { useEffect, useRef, useState } from 'react';
import { decode, encode } from './functions';
import styles from './styles';

interface Props {
    value: string;
    onChange: (value: string) => void;
    min?: string;
    max?: string;
    color?: string;
    width?: string;
}

/**
 * Range Slider component, allowing users to drag the slider to choose value they want
 * @param min - minimum value
 * @param max - maximum value
 * @param color - color scheme of the range slider
 * @param width - specify the width of the component
 * @param value - a chosen value
 * @param onChange - to set a value
 * @returns
 */
const RangeSlider = ({
    min = '0',
    max = '100',
    color = '#f0f0f7',
    width = '200',
    value,
    onChange,
}: Props) => {
    let percentage = encode(value, min, max);
    const sliderBorderRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setMouseDown] = useState<boolean>(false);
    const [isHover, setHover] = useState<boolean>(false);

    const handleDrag = (
        isClicked: boolean,
        e: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent
    ) => {
        if (!isMouseDown && !isClicked) return;

        const sliderBorder = sliderBorderRef.current as HTMLDivElement;
        const dimension = sliderBorder.getBoundingClientRect();

        let clientX: number;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        percentage = (clientX - dimension.left) / dimension.width;
        let currentValue = decode(percentage, min, max);
        if (currentValue > parseInt(max)) {
            currentValue = parseInt(max);
        }

        if (currentValue < parseInt(min)) {
            currentValue = parseInt(min);
        }

        onChange(currentValue.toString());
    };

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            // For touch events, prevent the default scrolling behavior
            if (e.type === 'touchmove') {
                e.preventDefault();
            }
            // handleDrag already checks if the mouse is down, so we can call it directly.
            handleDrag(false, e);
        };

        const handleMouseUp = () => {
            setMouseDown(false);
        };

        // Only add these listeners when the mouse is down
        if (isMouseDown) {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleMove, {
                passive: false,
            });
            document.addEventListener('touchend', handleMouseUp);
        }

        // The cleanup function will be called when the component unmounts
        // or when `isMouseDown` changes.
        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [isMouseDown]);

    return (
        <div
            style={{
                ...styles.slider_border,
                width: `${width}px`,
            }}
            // mouse event handling
            onMouseDown={(e) => {
                handleDrag(true, e);
                setMouseDown(true);
            }}
            // touch event handling
            onTouchStart={(e) => {
                handleDrag(true, e);
                setMouseDown(true);
            }}
            ref={sliderBorderRef}
        >
            <span
                style={{
                    ...styles.fill,
                    background: color,
                    width: `${percentage}%`,
                }}
            ></span>
            <span
                style={{
                    ...styles.thumb,
                    background: color,
                    left: `${percentage}%`,
                }}
                onMouseMove={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <span
                    style={{
                        ...styles.value,
                        scale: isMouseDown || isHover ? '1' : '0',
                    }}
                >
                    {value}
                </span>
                <span
                    style={{
                        ...styles.thumb_shadow,
                        background: color,
                        scale: isMouseDown || isHover ? '1' : '0',
                    }}
                ></span>
            </span>
            <span
                style={{
                    ...styles.rest,
                    background: color,
                }}
            ></span>
        </div>
    );
};

export default RangeSlider;
