import { useEffect, useRef, useState } from 'react';
import { MyContext } from './context'
import Dropdown from './Dropdown'
import styles from './styles.module.css'
import { IoMdClose } from "react-icons/io";

export type Options = {
    label: string,
    value: string
}[]

interface Props {
  options: Options,
  value: string
  onChange: (value: string) => void
}

/**
 * Select component, allowing users to select options from dropdown menu
 * @param options - list of options, which is an array of object [{ label: string, value: string }]
 * @param value - a chosen value
 * @param onChange - a function to set a value
 * @returns 
 */
const Select = ({ options, value, onChange }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement>(null)
  
  const clickHandler = (e: PointerEvent) => {
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
        width: '200px'
      }}
      ref={selectRef}
      >
          {/* select box */}
          <div className={styles.select_box} onClick={() => setOpen(prev => !prev)}>
            {/* value */}
            <div className={styles.value}>{value}</div>
            {/* Clear value */}
            <div className={styles.close} title='clear' onClick={() => {
              onChange('')
              setOpen(prev => !prev)
            }}>
              <IoMdClose />
            </div>
          </div>

          {/* drop down */}
          {open && <Dropdown />}
      </div>
    </MyContext.Provider>
  )
}

export default Select
