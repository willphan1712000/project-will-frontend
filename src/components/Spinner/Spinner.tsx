import { keyframeStyles, styles } from './spinner.style';

interface Props {
    brand?: string;
}

const Spinner = ({ brand = 'WillPhan' }: Props) => {
    return (
        <>
            <style>{keyframeStyles}</style>
            <div style={styles.container}>
                <div style={styles.circleSpinner}></div>
                <span style={styles.text}>{brand}</span>
            </div>
        </>
    );
};

export default Spinner;
