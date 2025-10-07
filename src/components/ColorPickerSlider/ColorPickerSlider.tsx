import { useEffect, useRef, useState } from 'react';
import styles from './colorPickerSlider.module.css';
import { decode, encode } from './functions';

interface Props {
  value: string,
  onChange: (value: string) => void,
  width?: string
}

/**
 * ColorPickerSlider component, allowing users to select a color by dragging the slider
 * @param value
 * @param onChange
 * @param width
 * @returns 
 */
const ColorPickerSlider = ({ value, onChange, width = "200" }: Props) => {
  let percentage = encode(value)
  const sliderBorderRef = useRef<HTMLDivElement>(null)

  const [isMouseDown, setMouseDown] = useState<boolean>(false)
  const [isHover, setHover] = useState<boolean>(false)
  
  const handleDrag = (isClicked: boolean, e: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent) => {
    if(!isMouseDown && !isClicked) return
    
    const sliderBorder = sliderBorderRef.current as HTMLDivElement
    const dimension = sliderBorder.getBoundingClientRect()

    let clientX: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    percentage = (clientX - dimension.left) / dimension.width
    if(percentage < 0) percentage = 0
    
    if(percentage > 1) percentage = 0.99
    // console.log(decode(1))
    
    onChange(decode(percentage))
  }

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
      document.addEventListener('touchmove', handleMove, { passive: false });
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
  }, [isMouseDown])

  return (
    <div className={styles.border} style={{
      width: `${width}px`
    }}
      onMouseDown={e => {
        handleDrag(true, e)
        setMouseDown(true)
      }}

      onTouchStart={e => {
        handleDrag(true, e)
        setMouseDown(true)
      }}
      ref={sliderBorderRef}
    >
      <div className={styles.thumb} style={{
        width: `${parseInt(width) * 0.1}px`,
        background: value,
        left: `${percentage}%`
      }}
        onMouseMove={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      ></div>
      <div className={styles.label} style={{
        left: `${percentage}%`,
        scale: isHover || isMouseDown ? "1" : "0"
      }}>{value}</div>
    </div>
  )
}

export default ColorPickerSlider
