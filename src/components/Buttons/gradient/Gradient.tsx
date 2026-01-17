import { motion } from 'framer-motion';
import { useButtonContext } from '../Button';
import stylesFunc from './styles';

const Gradient = () => {
    const data = useButtonContext();
    const styles = stylesFunc(data.first!, data.second!);

    return (
        <div
            style={{
                ...styles.container,
                overflow: data.isLoading ? 'hidden' : '',
            }}
        >
            <button style={styles.btn} {...data.props}>
                <div style={{ position: 'relative' }}>
                    <div style={styles.labelBefore}></div>
                    <div
                        style={{
                            ...styles.label,
                            backgroundColor: data.main,
                        }}
                    >
                        <p
                            style={{
                                ...styles.p,
                                color: `${data.text}`,
                            }}
                        >
                            {data.children} {data.content}
                        </p>
                    </div>
                    <div style={styles.labelAfter}></div>
                </div>
            </button>
            {!data.isLoading && <div style={styles.btnAfter}></div>}
            {data.isLoading && (
                <motion.div
                    style={styles.btnAfter}
                    animate={{ rotate: 360 }}
                    transition={{
                        ease: 'linear',
                        repeat: Infinity,
                        duration: 3,
                    }}
                />
            )}
        </div>
    );
};

export default Gradient;
