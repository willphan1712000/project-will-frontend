import { useEffect, useRef } from 'react';
import { Options } from '..';
import useMyContext from './context';
import styles from './styles';

interface Props {
    options?: Options;
    onSearch: React.Dispatch<React.SetStateAction<Options | undefined>>;
}

const Search = ({ options, onSearch }: Props) => {
    const { styling, open } = useMyContext();
    const { backgroundColor, textColor: color } = styling!;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus();
    }, [open]);

    return (
        <div style={styles.search_border}>
            <input
                ref={inputRef}
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
