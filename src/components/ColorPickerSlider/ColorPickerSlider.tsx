import { useEffect, useRef, useState } from 'react';
import { decode, encode } from './functions';
import styles from './styles';
import Info from '@/src/components/Info/Info';

interface Props {
    value: string;
    onChange: (value: string) => void;
    isReadOnly?: boolean;
    description?: string;
    options?: {
        width?: string;
        backgroundColor?: string;
        textColor?: string;
    };
}

/**
 * ColorPickerSlider component, allowing users to select a color by dragging the slider
 *
 * @param value current hex color value
 * @param onChange callback to update the color value
 * @param isReadOnly if true, disables color selection/dragging (defaults to false)
 * @param description description tooltip text shown on hover of the info icon
 * @param options configuration options for styling (width, backgroundColor, textColor)
 * @returns React Component
 */
const ColorPickerSlider = ({
    value,
    onChange,
    isReadOnly = false,
    description = '',
    options = {
        width: '200',
        backgroundColor: '#000',
        textColor: '#fff',
    },
}: Props) => {
    const { width = '200', backgroundColor, textColor: color } = options;

    let percentage = encode(value);
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

        let clientX: number = 'touches' in e ? e.touches[0].clientX : e.clientX;
        percentage = (clientX - dimension.left) / dimension.width;

        if (percentage < 0) percentage = 0;

        if (percentage > 1) percentage = 0.99;
        // console.log(decode(1))

        onChange(decode(percentage));
    };

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            // For touch events, prevent the default scrolling behavior
            if (e.type === 'touchmove') e.preventDefault();
            // handleDrag already checks if the mouse is down, so we can call it directly.
            handleDrag(false, e);
        };

        const handleMouseUp = () => setMouseDown(false);

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
        <div style={styles.container}>
            <div
                style={{
                    ...styles.border,
                    width: `${width}px`,
                }}
                onMouseDown={(e) => {
                    if (isReadOnly) return;
                    handleDrag(true, e);
                    setMouseDown(true);
                }}
                onTouchStart={(e) => {
                    if (!isReadOnly) return;
                    handleDrag(true, e);
                    setMouseDown(true);
                }}
                ref={sliderBorderRef}
            >
                <div
                    style={{
                        ...styles.thumb,
                        width: `${parseInt(width!) * 0.1}px`,
                        background: value,
                        left: `${percentage}%`,
                    }}
                    onMouseMove={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                ></div>
                <div
                    style={{
                        ...styles.label,
                        backgroundColor,
                        color,
                        left: `${percentage}%`,
                        scale: isHover || isMouseDown ? '1' : '0',
                    }}
                >
                    {value}
                </div>
            </div>
            <div style={styles.info}>
                <Info
                    message={isReadOnly ? 'Locked - Read Only' : description}
                    options={{ backgroundColor: color, color: backgroundColor }}
                />
            </div>
        </div>
    );
};

export default ColorPickerSlider;
