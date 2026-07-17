import { useEffect, useRef } from 'react';
import { Options } from '..';
import useMyContext from './context';
import styles from './styles';

interface Props {
    options?: Options;
    onSearch: React.Dispatch<React.SetStateAction<Options | undefined>>;
}

/**
 * Private Search component -> take original options and perform onSearch operation on option label to find desired options
 */
const Search = ({ options, onSearch }: Props) => {
    const { open, styling } = useMyContext();
    const { backgroundColor, textColor: color } = styling!;

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <div style={styles.search_border}>
            <input
                ref={inputRef}
                placeholder="Search"
                style={{
                    ...styles.search,
                    backgroundColor,
                    color,
                }}
                id="search"
                name="search"
                onChange={(e) =>
                    onSearch(
                        options!.filter((ele) => {
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
