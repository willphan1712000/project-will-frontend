import { useState } from "react"
import useMyContext from "./context"
import Search from "./Search"
import styles from './styles.module.css'

const Dropdown = () => {
  const { options, onChange, setOpen } = useMyContext()
  const [optionsCopy, setOption] = useState(options)

  return (
    <div className={styles.dropdown}>
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
