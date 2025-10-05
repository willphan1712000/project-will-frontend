import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

interface Props {
  value: string,
  onChange: (value: string) => void
  min?: string,
  max?: string,
  color?: string,
  width?: string
}

/**
 * Range Slider component, allowing users to drag the slider to choose value they want
 * @returns 
 */
const RangeSlider = ({min = "0", max = "100", color = "#f0f0f7", width = "200", value, onChange}: Props) => {
  let percentange = (parseInt(value) - parseInt(min)) * 100 / (
    parseInt(max) - parseInt(min)
  )
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
    percentange = (clientX - dimension.left) / dimension.width
    const range = parseInt(max) - parseInt(min)
    let currentValue = Math.round(parseInt(min) + percentange * range)
    if(currentValue > parseInt(max)) {
      currentValue = parseInt(max)
    }

    if(currentValue < parseInt(min)) {
      currentValue = parseInt(min)
    }

    onChange(currentValue.toString())
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
    <div className={styles.slider_border}
      style={{
        width: `${width}px`
      }}
      // mouse event handling
      onMouseDown={e => {
        handleDrag(true, e)
        setMouseDown(true)
      }}

      // touch event handling
      onTouchStart={e => {
        handleDrag(true, e)
        setMouseDown(true)
      }}

      ref={sliderBorderRef}
    >
      <span className={styles.fill} style={{
        backgroundColor: color,
        width: `${percentange}%`
      }}></span>
      <span className={styles.thumb} style={{
        backgroundColor: color,
        left: `${percentange}%`
      }}
      onMouseMove={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      >
        <span className={styles.value} style={{
          scale: isMouseDown || isHover ? "1": "0"
        }}>{value}</span>
        <span className={styles.thumb_shadow} style={{
          backgroundColor: color,
          scale: isMouseDown || isHover ? "1" : "0"
        }}></span>
      </span>
      <span className={styles.rest} style={{
        backgroundColor: color
      }}></span>
    </div>
  )
}

export default RangeSlider
