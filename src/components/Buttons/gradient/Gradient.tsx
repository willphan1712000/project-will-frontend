import { useEffect } from 'react';
import {
    motion,
    useMotionValue,
    useMotionTemplate,
    animate,
} from 'framer-motion';
import { useButtonContext } from '../Button';
import stylesFunc from './styles';

const Gradient = () => {
    const data = useButtonContext();
    const styles = stylesFunc(data.first!, data.second!);

    const angle = useMotionValue(10);
    const background = useMotionTemplate`conic-gradient(from ${angle}deg, #00000000 60%, ${data.first!}, ${data.second!})`;

    useEffect(() => {
        if (data.isLoading) {
            const controls = animate(angle, angle.get() + 360, {
                repeat: Infinity,
                duration: 2,
                ease: 'linear',
            });

            return controls.stop;
        }
    }, [data.isLoading, angle]);

    return (
        <div style={styles.container}>
            <button style={styles.btn} {...data.props}>
                <div style={styles.labelWrapper}>
                    <div style={styles.labelBefore}></div>
                    <div
                        style={{ ...styles.label, backgroundColor: data.main }}
                    >
                        <p style={{ ...styles.p, color: `${data.text}` }}>
                            {data.children} {data.content}
                        </p>
                    </div>
                    <div style={styles.labelAfter}></div>
                </div>
            </button>

            <motion.div
                style={{
                    ...styles.btnAfter,
                    background,
                }}
            />
        </div>
    );
};

export default Gradient;
