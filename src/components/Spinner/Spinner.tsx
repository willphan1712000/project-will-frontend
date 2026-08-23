import WUII from '..';
import { keyframeStyles, styles } from './spinner.style';

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
