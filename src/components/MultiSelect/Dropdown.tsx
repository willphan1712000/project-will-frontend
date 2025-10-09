import { useEffect, useRef, useState } from "react"
import useMyContext from "./context"
import Search from "./Search"
// import styles from './dropdownSelect.module.css'
import styles from './styles'

const Dropdown = () => {
  const { options, onChange, setOpen } = useMyContext()
  const [ isVisible, setVisible ] = useState<boolean>(true)
  const [ keyOnHover, setKeyOnHover ] = useState<number>(-1)
  const [ optionsCopy, setOption ] = useState(options)

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
    <div
      ref={dropdownRef}
      style={isVisible ? {
        ...styles.dropdown,
        top: 'calc(100% + 5px)'
      } : {
        ...styles.dropdown,
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
          style={{
            ...styles.element,
            backgroundColor: keyOnHover === key ? '#f0f0f0' : '#fff'
          }}
          onClick={() => {
            onChange(prev => {
              if(prev.includes(option.value))
                return [...prev]

              return [...prev, option.value]
            })
            setOpen(prev => !prev)
          }}
          onMouseEnter={() => setKeyOnHover(key)}
          onMouseLeave={() => setKeyOnHover(-1)}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}

export default Dropdown
