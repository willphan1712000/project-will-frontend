import Info from '@/src/components/Info/Info';
import styles from './styles';
import WUII from '..';

/**
 * Option Slider component, allowing users to select a value they want with the help of element representation. Label is a React Node JSX that represents the option. For example, if a value was a font, the label would be a React Node JSX that represents a character using the font.
 * @param value - a chosen value of type string
 * @param setValue - callback function to update the selected value
 * @param options - list of options, format Options {@link Options}
 * @param isReadOnly - if true, disables changing the selected option (defaults to false)
 * @param description - description tooltip text shown on hover of the info icon (defaults to '')
 * @param styling - optional styling configuration containing backgroundColor (defaults to '#fff'), textColor (defaults to '#000'), and borderColor (defaults to '#000')
 */
const OptionSlider = ({
    value,
    setValue,
    options,
    isReadOnly = false,
    description = '',
    styling = {},
}: WUII<string>) => {
    const {
        backgroundColor = '#fff',
        textColor = '#000',
        borderColor = '#000',
    } = styling;
    return (
        <div style={styles.container}>
            <div
                style={{
                    ...styles.border,
                    border: 'solid 1px ' + borderColor,
                }}
            >
                <div
                    style={{
                        ...styles.background,
                        backgroundColor,
                    }}
                ></div>
                <div style={styles.options}>
                    {options &&
                        options.map((option, key) => (
                            <div
                                style={{
                                    ...styles.element,
                                    backgroundColor,
                                    border:
                                        value === option.value
                                            ? 'solid 2px ' + borderColor
                                            : 'none',
                                }}
                                key={key}
                                onClick={() => {
                                    if (isReadOnly) return;
                                    if (setValue) setValue(option.value);
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
