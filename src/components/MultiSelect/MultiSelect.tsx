import { useEffect, useRef, useState } from 'react';
import { MyContext } from './context';
import Dropdown from './Dropdown';
import styles from './styles';
import { X } from '../Icons';
import Info from '@/src/components/Info/Info';
import WUII from '..';

/**
 * MultiSelect component, allowing users to select multiple options from dropdown menu with search
 * @param options - list of options, which is an array of Options {@link Options}
 * @param value - an array of chosen values
 * @param setValue - callback function to set an array of values
 * @param isReadOnly - if true, disables selecting or clearing options (defaults to false)
 * @param description - description tooltip text shown on hover of the info icon (defaults to '')
 * @param styling - optional configuration for custom styling (backgroundColor, textColor, hoverBackgroundColor)
 */
const MultiSelect = ({
    value = [],
    setValue = () => {},
    options,
    isReadOnly = false,
    description = '',
    styling = {},
}: WUII<string[]>) => {
    const {
        backgroundColor = '#fff',
        textColor: color = '#000',
        hoverBackgroundColor = '#f0f0f0',
    } = styling;
    const [open, setOpen] = useState<boolean>(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const clickHandler = (e: MouseEvent) => {
        const select = selectRef.current as HTMLDivElement;
        if (!select.contains(e.target as HTMLElement)) setOpen(false);
    };

    const clearRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (clearRef.current)
            clearRef.current.style.backgroundColor = hoverBackgroundColor;
    };

    const handleMouseLeave = () => {
        if (clearRef.current)
            clearRef.current.style.backgroundColor = backgroundColor;
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
                setValue,
                open,
                setOpen,
                styling,
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
                    {/* value */}
                    <div style={styles.value}>
                        {value.map((eachValue, key) => (
                            <div
                                style={{
                                    ...styles.eachValue,
                                    backgroundColor: hoverBackgroundColor,
                                    color,
                                }}
                                key={key}
                            >
                                {eachValue}
                                {!isReadOnly && (
                                    <span
                                        title="Remove this option"
                                        style={{
                                            ...styles.closeEach,
                                            color,
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setValue(
                                                value.filter(
                                                    (e) => e !== eachValue
                                                )
                                            );
                                        }}
                                    >
                                        <X size="20" />
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Clear value */}
                    {!isReadOnly && (
                        <div
                            ref={clearRef}
                            style={{
                                ...styles.close,
                                color,
                            }}
                            title="Clear all"
                            onClick={(e) => {
                                e.stopPropagation();
                                setValue([]);
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <X />
                        </div>
                    )}
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

export default MultiSelect;
