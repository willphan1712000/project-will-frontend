import React from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import styles from './styles';

interface Props {
    open?: boolean;
    close?: () => void;
    options?: {
        backgroundColor?: string;
    };
    children?: React.ReactNode;
}

let track = false;

/**
 * Overlay component holding a main element that users interect with
 * - Users freely interact with the main element
 * - When clicking on the main element, nothing happens
 * - When clicking on the overlay element, a state changes
 * - We can treat this component as div element with ...props
 * - Opening zooms the main element in, closing zooms it out
 *
 * @param open - open overlay modal state
 * @param close - method to change open state
 * @param chilren - React children component
 * @param options - customize the overlay background color
 *
 * @returns Overlay element holding a child main element
 * @example
 * ```tsx
 * ...component declaration
 *
 * const [value, setValue] = useState<boolean>(false)
 *
 * <Overlay open={value} close={() => setValue(false)} options={{ backgroundColor: '#fff' }}>
 *    <div>Hello</div>
 * </Overlay>
 * ```
 */
const Overlay = ({
    open,
    close,
    options = { backgroundColor: '#fff' },
    children,
    ...props
}: Props & React.ComponentProps<'div'>) => {
    const { backgroundColor } = options;
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    style={{ ...styles.overlay, backgroundColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) track = true;
                    }}
                    onMouseUp={(e) => {
                        if (e.target === e.currentTarget && track && close)
                            close();
                        track = false;
                    }}
                    {...(props as HTMLMotionProps<'div'>)}
                >
                    <motion.div
                        style={styles.child}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Overlay;
