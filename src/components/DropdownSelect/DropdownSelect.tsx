import { useEffect, useRef, useState } from 'react';
import { MyContext } from './context';
import Dropdown from './Dropdown';
import { IoMdClose } from 'react-icons/io';
import styles from './styles';

export type Options = {
    label: string;
    value: string;
}[];

interface Props {
    options: Options;
    value: string;
    onChange: (value: string) => void;
    width?: string;
}

/**
 * Dropdown Select component, allowing users to select options from dropdown menu
 * @param options - list of options, which is an array of object [{ label: string, value: string }]
 * @param value - a chosen value
 * @param onChange - a function to set a value
 * @param width - specify the width of the component
 * @returns
 */
const DropdownSelect = ({ options, value, onChange, width = '200' }: Props) => {
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
            <div
                style={{
                    width: `${width}px`,
                    position: 'relative',
                }}
                ref={selectRef}
            >
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
                        <IoMdClose />
                    </div>
                </div>

                {/* drop down */}
                {open && <Dropdown />}
            </div>
        </MyContext.Provider>
    );
};

export default DropdownSelect;
