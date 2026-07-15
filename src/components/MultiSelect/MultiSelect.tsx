import { useEffect, useRef, useState } from 'react';
import { MyContext } from './context';
import Dropdown from './Dropdown';
import styles from './styles';
import { X } from '../Icons';
import Info from '@/src/components/Info/Info';

export type Options = {
    label: string;
    value: string;
}[];

interface Props {
    options: Options;
    value: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    isReadOnly?: boolean;
    description?: string;
    config?: {
        backgroundColor?: string;
        textColor?: string;
        hoverBackgroundColor?: string;
    };
}

/**
 * MultiSelect component, allowing users to select multiple options from dropdown menu with search
 * @param options - list of options, which is an array of object Options {@link Options}
 * @param value - an array of chosen values
 * @param onChange - a function to set an array of values
 * @param isReadOnly - if true, disables selecting or clearing options (defaults to false)
 * @param description - description tooltip text shown on hover of the info icon
 * @param config - optional configuration for custom styling (backgroundColor, textColor, hoverBackgroundColor)
 */
const MultiSelect = ({
    options,
    value,
    onChange,
    isReadOnly = false,
    description = '',
    config = {
        backgroundColor: '#fff',
        textColor: '#000',
        hoverBackgroundColor: '#f0f0f0',
    },
}: Props) => {
    const { backgroundColor, textColor: color, hoverBackgroundColor } = config;
    const [open, setOpen] = useState<boolean>(false);
    const [isHoverClose, setHoverClose] = useState<boolean>(false);
    const [isHoverCloseEach, setHoverCloseEach] = useState<number>(-1);

    const selectRef = useRef<HTMLDivElement>(null);

    const clickHandler = (e: MouseEvent) => {
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
                    {/* value */}
                    <div style={styles.value}>
                        {value.map((eachValue, key) => (
                            <div
                                style={{
                                    ...styles.eachValue,
                                    backgroundColor,
                                    color,
                                }}
                                key={key}
                            >
                                {eachValue}
                                {!isReadOnly && (
                                    <span
                                        onMouseEnter={() => {
                                            setHoverCloseEach(key);
                                        }}
                                        onMouseLeave={() => {
                                            setHoverCloseEach(-1);
                                        }}
                                        title="Remove this option"
                                        style={{
                                            ...styles.closeEach,
                                            backgroundColor:
                                                isHoverCloseEach === key
                                                    ? hoverBackgroundColor
                                                    : 'transparent',
                                            color,
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onChange((prev) =>
                                                prev.filter(
                                                    (o) => o !== eachValue
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
                            style={{
                                ...styles.close,
                                backgroundColor: isHoverClose
                                    ? hoverBackgroundColor
                                    : backgroundColor,
                                color,
                            }}
                            title="Clear all"
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange([]);
                            }}
                            onMouseEnter={() => setHoverClose(true)}
                            onMouseLeave={() => setHoverClose(false)}
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
