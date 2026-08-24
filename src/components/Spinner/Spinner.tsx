import WUII from '..';
import { keyframeStyles, styles } from './spinner.style';

/**
 * Spinner component displaying an animated circular loader alongside animated text
 *
 * @param value - The text displayed inside the spinner (defaults to 'WillPhan')
 * @param styling - Optional configuration for custom styling (textColor sets spinner border and text gradient color)
 * @returns React Element rendering the spinner loader
 *
 * @example
 * ```tsx
 * <Spinner
 *     value="Loading..."
 *     styling={{
 *         textColor: "#0957d0"
 *     }}
 * />
 * ```
 */
const Spinner = ({ value = 'WillPhan', styling = {} }: WUII<string>) => {
    const { textColor = '#6f6f6f' } = styling;
    return (
        <>
            <style>{keyframeStyles}</style>
            <div style={styles.container}>
                <div style={styles.wrapper}>
                    <div
                        style={{
                            ...styles.circleSpinner,
                            borderTopColor: textColor,
                        }}
                    ></div>
                    <span
                        style={{
                            ...styles.text,
                            background: `linear-gradient(110deg, ${textColor} 40%, #ffffff 50%, ${textColor} 60%)`,
                        }}
                    >
                        {value}
                    </span>
                </div>
            </div>
        </>
    );
};

export default Spinner;
