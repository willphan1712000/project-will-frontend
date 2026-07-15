import useMyContext from './context';
import { Options } from './MultiSelect';
import styles from './styles';

interface Props {
    options: Options;
    onSearch: React.Dispatch<React.SetStateAction<Options>>;
}

const Search = ({ options, onSearch }: Props) => {
    const { config } = useMyContext();
    const { backgroundColor, textColor: color } = config!;

    return (
        <div style={styles.search_border}>
            <input
                placeholder="Search..."
                style={{
                    ...styles.search,
                    backgroundColor,
                    color,
                }}
                id="search"
                name="search"
                onChange={(e) =>
                    onSearch(
                        options.filter((ele) => {
                            return ele.value
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
