import { useEffect, useRef, useState } from 'react';
import { X } from '../Icons';
import { MyContext } from './context';
import Info from '@/src/components/Info/Info';
import Dropdown from './Dropdown';
import styles from './styles';
import WUII from '@/src/components/index';

/**
 * Dropdown Select component, allowing users to select options from dropdown menu
 *
 * @param options - List of select options of type {@link Options}
 * @param value - The currently selected value
 * @param setValue - Callback function triggered when a new value is selected
 * @param isReadOnly - If true, disables opening or changing the dropdown select (defaults to false)
 * @param description - Description tooltip text shown on hover of the info icon
 * @param styling - Optional configuration for custom styling (backgroundColor, textColor, hoverBackgroundColor)
 * @returns React Element rendering the dropdown select input
 */
const DropdownSelect = ({
    options,
    value,
    setValue: onChange,
    isReadOnly = false,
    description = '',
    styling: config = {
        backgroundColor: '#fff',
        textColor: '#000',
        hoverBackgroundColor: '#f0f0f0',
    },
}: WUII<string>) => {
    const { backgroundColor, textColor: color } = config;

    const [open, setOpen] = useState<boolean>(false);

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
                config,
            }}
        >
            <div style={styles.container} ref={selectRef}>
                {/* select box */}
                <div
                    style={{
                        ...styles.select_box,
                        backgroundColor,
                        color,
                    }}
                    onClick={() => {
                        if (isReadOnly) return;
                        setOpen((prev) => !prev);
                    }}
                >
                    <div style={styles.value}>{value}</div>
                    <div
                        style={{
                            ...styles.close,
                            color,
                        }}
                        title="clear"
                        onClick={() => {
                            if (isReadOnly) return;
                            if (onChange) onChange('');
                            setOpen((prev) => !prev);
                        }}
                    >
                        <X />
                    </div>
                </div>

                {/* drop down */}
                {open && <Dropdown />}
                <div style={styles.info}>
                    <Info
                        message={
                            isReadOnly ? 'Locked - Read Only' : description
                        }
                        options={{
                            backgroundColor: color,
                            color: backgroundColor,
                        }}
                    />
                </div>
            </div>
        </MyContext.Provider>
    );
};

export default DropdownSelect;
