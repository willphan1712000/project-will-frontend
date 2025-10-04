import { Options } from './DropdownSelect'
import styles from './styles.module.css'

interface Props {
  options: Options
  onSearch: React.Dispatch<React.SetStateAction<Options>>
}

const Search = ({options, onSearch}: Props) => {
  return (
    <div className={styles.search_border}>
      <input placeholder="Search" className={styles.search} id="search" name="search"
      onChange={(e) => onSearch(options.filter(ele => 
        ele.value.toLowerCase().includes(e.target.value.toLowerCase())
      ))}
      />
    </div>
  )
}

export default Search
