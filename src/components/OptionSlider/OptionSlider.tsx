import { ReactNode } from 'react';
import Info from '@/src/components/Info/Info';
import styles from './styles';

export type Options = {
    label: ReactNode;
    value: string;
}[];

interface Props {
    value: string;
    onChange: (value: string) => void;
    options: Options;
    color?: string;
    isReadOnly?: boolean;
    description?: string;
    config?: {
        backgroundColor?: string;
        textColor?: string;
    };
}

/**
 * Option Slider component, allowing users to select a value they want with the help of element representaion. Label is a React Node jsx that represents the option. For example, if a value was a font, the label would be a React Node jsx that represents a character using the font
 * @param value - a chosen value
 * @param onChange - to set a value
 * @param options - list of options, format Options {@link Options}
 * @param color - background color of the slider track (defaults to '#f0f0f7')
 * @param isReadOnly - if true, disables changing the selected option (defaults to false)
 * @param description - description tooltip text shown on hover of the info icon
 * @param config - optional configuration for custom styling (backgroundColor, textColor)
 */
const OptionSlider = ({
    value,
    onChange,
    options,
    color = '#f0f0f7',
    isReadOnly = false,
    description = '',
    config = {
        backgroundColor: '#fff',
        textColor: '#000',
    },
}: Props) => {
    const { backgroundColor, textColor } = config;
    return (
        <div style={styles.container}>
            <div
                style={{
                    ...styles.border,
                    width: `100%`,
                    height: `100%`,
                }}
            >
                <div
                    style={{
                        ...styles.background,
                        background: color,
                    }}
                ></div>
                <div style={styles.options}>
                    {options.map((option, key) => (
                        <div
                            style={{
                                ...styles.element,
                                background: color,
                                border:
                                    value === option.value
                                        ? 'solid 2px #000'
                                        : 'solid 1px #000',
                            }}
                            key={key}
                            onClick={() => {
                                if (isReadOnly) return;
                                onChange(option.value);
                            }}
                            title={option.value}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
            <div style={styles.info}>
                <Info
                    message={isReadOnly ? 'Locked - Read Only' : description}
                    options={{
                        backgroundColor: textColor,
                        color: backgroundColor,
                    }}
                />
            </div>
        </div>
    );
};

export default OptionSlider;
