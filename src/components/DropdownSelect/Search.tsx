import { Options } from './DropdownSelect';
import styles from './styles';

interface Props {
    options: Options;
    onSearch: React.Dispatch<React.SetStateAction<Options>>;
}

/**
 * Private Search component -> take original options and perform onSearch operation on option label to find desired options
 */
const Search = ({ options, onSearch }: Props) => {
    return (
        <div style={styles.search_border}>
            <input
                placeholder="Search"
                style={styles.search}
                id="search"
                name="search"
                onChange={(e) =>
                    onSearch(
                        options.filter((ele) => {
                            return ele.label
                                .toLowerCase()
                                .includes(e.target.value.toLowerCase());
                        })
                    )
                }
            />
        </div>
    );
};

export default Search;
