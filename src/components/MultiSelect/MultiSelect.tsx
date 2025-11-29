import { useEffect, useRef, useState } from 'react';
import { MyContext } from './context'
import Dropdown from './Dropdown'
import { IoMdClose } from "react-icons/io";
import styles from './styles';

export type Options = {
    label: string,
    value: string
}[]

interface Props {
  options: Options,
  value: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>,
  width?: string
}

/**
 * MultiSelect component, allowing users to select multiple options from dropdown menu with search
 * @param options - list of options, which is an array of object [{ label: string, value: string }]
 * @param value - an array of chosen values
 * @param onChange - a function to set an array of values
 * @param width - specify the width of the component
 * @returns 
 */
const MultiSelect = ({ options, value, onChange, width = "200" }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [ isHoverClose, setHoverClose ] = useState<boolean>(false)
  const [ isHoverCloseEach, setHoverCloseEach ] = useState<number>(-1)

  const selectRef = useRef<HTMLDivElement>(null)
  
  const clickHandler = (e: MouseEvent) => {
      const select = selectRef.current as HTMLDivElement
      if(!select.contains(e.target as HTMLElement)) {
        setOpen(false)
      }
  }

  useEffect(() => {
    window.addEventListener('click', clickHandler)

    return () => window.removeEventListener('click', clickHandler)
  }, [])

  return (
    <MyContext.Provider value={{
      options,
      value,
      onChange,
      setOpen
    }}>
      <div style={{
        width: `${width}px`,
        position: 'relative'
      }}
      ref={selectRef}
      >
          {/* select box */}
          <div style={styles.select_box}
          onClick={() => setOpen(prev => !prev)}>
            {/* value */}
            <div style={styles.value}>
              {value.map((eachValue, key) => (
                <div style={styles.eachValue} key={key}>
                  <span
                    onMouseEnter={() => { setHoverCloseEach(key) }}
                    onMouseLeave={() => { setHoverCloseEach(-1) }}
                    title="Remove this option"
                    style={{
                      ...styles.closeEach,
                      scale: isHoverCloseEach === key ? "1.2" : "1"
                    }}
                    onClick={() => {
                      onChange(prev => prev.filter(o => o !== eachValue))
                      setOpen(prev => !prev)
                    }}
                  ><IoMdClose /></span>
                  {eachValue}
                </div>
              ))}
            </div>
            {/* Clear value */}
            <div style={{
              ...styles.close,
              backgroundColor: isHoverClose ? '#f0f0f0' : '#fff'
            }} title='Clear all'
              onClick={() => {
                onChange([])
                setOpen(prev => !prev)
              }}
              onMouseEnter={() => setHoverClose(true)}
              onMouseLeave={() => setHoverClose(false)}
            >
              <IoMdClose />
            </div>
          </div>
          
          {/* drop down */}
          {open && <Dropdown />}
      </div>
    </MyContext.Provider>
  )
}

export default MultiSelect
