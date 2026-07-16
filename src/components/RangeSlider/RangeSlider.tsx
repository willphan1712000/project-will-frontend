import { useEffect, useRef, useState } from 'react';
import { decode, encode } from './functions';
import Info from '@/src/components/Info/Info';
import styles from './styles';
import WUII from '..';

/**
 * Range Slider component, allowing users to drag the slider to choose the value they want
 * @param value - a chosen value
 * @param setValue - callback function to set the value
 * @param isReadOnly - if true, disables sliding or dragging (defaults to false)
 * @param description - description tooltip text shown on hover of the info icon (defaults to '')
 * @param range - object containing range boundaries
 * @param range.min - minimum value (defaults to '0')
 * @param range.max - maximum value (defaults to '100')
 * @param styling - optional configuration for custom styling
 * @param styling.primaryColor - color scheme of the range slider (defaults to 'purple')
 * @param styling.backgroundColor - background color of the value tooltip (defaults to '#fff')
 * @param styling.textColor - text color of the value tooltip and info icon (defaults to '#000')
 * @param styling.width - width of the component in pixels (defaults to '200')
 */
const RangeSlider = ({
    value,
    setValue,
    isReadOnly = false,
    description = '',
    range = {
        min: '0',
        max: '100',
    },
    styling = {},
}: WUII<string>) => {
    const {
        primaryColor = 'purple',
        backgroundColor = '#fff',
        textColor = '#000',
        width = '200',
    } = styling;
    const { min = '0', max = '100' } = range;

    let percentage = encode(value!, min, max);
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

        if (setValue) setValue(currentValue.toString());
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
        <div style={styles.container}>
            <div
                style={{
                    ...styles.slider_border,
                    width: `${width}px`,
                }}
                // mouse event handling
                onMouseDown={(e) => {
                    if (isReadOnly) return;
                    handleDrag(true, e);
                    setMouseDown(true);
                }}
                // touch event handling
                onTouchStart={(e) => {
                    if (isReadOnly) return;
                    handleDrag(true, e);
                    setMouseDown(true);
                }}
                ref={sliderBorderRef}
            >
                <span
                    style={{
                        ...styles.fill,
                        background: primaryColor,
                        width: `${percentage}%`,
                    }}
                ></span>
                <span
                    style={{
                        ...styles.thumb,
                        background: primaryColor,
                        left: `${percentage}%`,
                    }}
                    onMouseMove={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <span
                        style={{
                            ...styles.value,
                            backgroundColor: textColor,
                            color: backgroundColor,
                            scale: isMouseDown || isHover ? '1' : '0',
                        }}
                    >
                        {value}
                    </span>
                    <span
                        style={{
                            ...styles.thumb_shadow,
                            background: primaryColor,
                            scale: isMouseDown || isHover ? '1' : '0',
                        }}
                    ></span>
                </span>
                <span
                    style={{
                        ...styles.rest,
                        background: primaryColor,
                    }}
                ></span>
            </div>
            <div style={styles.info}>
                <Info
                    message={isReadOnly ? 'Locked - Read Only' : description}
                    options={{
                        backgroundColor: textColor,
                        color: backgroundColor,
                    }}
                />
            </div>
        </div>
    );
};

export default RangeSlider;
