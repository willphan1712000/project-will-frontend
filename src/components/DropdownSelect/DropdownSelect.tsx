import { useEffect, useRef, useState } from 'react';
import { X } from '../Icons';
import { MyContext } from './context';
import Dropdown from './Dropdown';
import styles from './styles';

/**
 * Represents the structure of options available in the dropdown selection.
 *
 * Each item in the array contains:
 * @property {string} label - The user-friendly text displayed in the dropdown list.
 * @property {string} value - The actual value associated with the option.
 */
export type Options = {
    label: string;
    value: string;
}[];

interface Props {
    options: Options;
    value: string;
    onChange: (value: string) => void;
}

/**
 * Dropdown Select component, allowing users to select options from dropdown menu
 *
 * @param options - List of select options of type {@link Options}
 * @param value - The currently selected value
 * @param onChange - Callback function triggered when a new value is selected
 * @returns React Element rendering the dropdown select input
 */
const DropdownSelect = ({ options, value, onChange }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [isHoverClose, setHoverClose] = useState<boolean>(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const clickHandler = (e: PointerEvent) => {
        const select = selectRef.current as HTMLDivElement;
        if (!select.contains(e.target as HTMLElement)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', clickHandler);

        return () => window.removeEventListener('click', clickHandler);
    }, []);

    return (
        <MyContext.Provider
            value={{
                options,
                value,
                onChange,
                setOpen,
            }}
        >
            <div style={styles.container} ref={selectRef}>
                {/* select box */}
                <div
                    style={styles.select_box}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {/* value */}
                    <div style={styles.value}>{value}</div>
                    {/* Clear value */}
                    <div
                        style={{
                            ...styles.close,
                            backgroundColor: isHoverClose ? '#f0f0f0' : '#fff',
                        }}
                        title="clear"
                        onClick={() => {
                            onChange('');
                            setOpen((prev) => !prev);
                        }}
                        onMouseEnter={() => setHoverClose(true)}
                        onMouseLeave={() => setHoverClose(false)}
                    >
                        <X />
                    </div>
                </div>

                {/* drop down */}
                {open && <Dropdown />}
            </div>
        </MyContext.Provider>
    );
};

export default DropdownSelect;
