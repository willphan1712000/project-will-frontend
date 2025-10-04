import { useEffect, useRef, useState } from "react"
import useMyContext from "./context"
import Search from "./Search"
import styles from './styles.module.css'

const Dropdown = () => {
  const { options, onChange, setOpen } = useMyContext()
  const [isVisible, setVisible] = useState<boolean>(true)
  const [optionsCopy, setOption] = useState(options)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleResize = () => {
    const dropdown = dropdownRef.current as HTMLDivElement
    const dimension = dropdown.getBoundingClientRect()
    const distanceToBottom = window.innerHeight - dimension.bottom
    const distanceToTop = dimension.top
    if(distanceToBottom < 0) {
      setVisible(false)
    }

    if(distanceToTop < 0) {
      setVisible(true)
    }
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('scroll', handleResize)

    return () => {
      window.removeEventListener('scroll', handleResize)
    }
  }, [])

  return (
    <div className={styles.dropdown}
      ref={dropdownRef}
      style={isVisible ? {
        top: 'calc(100% + 5px)'
      } : {
        bottom: 'calc(100% + 5px)'
      }}
    >
      {/* Search */}
      <Search 
        options={options}
        onSearch={setOption}
      />
      {optionsCopy.map((option, key) => (
        <div
          key={key}
          className={styles.element}
          onClick={() => {
            onChange(option.value)
            setOpen(prev => !prev)
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}

export default Dropdown
