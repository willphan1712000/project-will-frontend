import React from 'react';
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
    if (!open) return null;
    return (
        <div
            style={{ ...styles.overlay, backgroundColor }}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) track = true;
            }}
            onMouseUp={(e) => {
                if (e.target === e.currentTarget && track && close) close();
                track = false;
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Overlay;
