import { useRef, useState } from 'react';
import styles, { others } from './InputGoogle.styles';

interface Props {
    value?: string;
    setValue?: (value?: string) => void;
    labelColor?: string;
}

/**
 * Input component shadows input box implemented by Google
 *
 * @link
 * https://accounts.google.com
 *
 * @param value
 * @param setValue
 * @param labelColor color of label. It should match the background color where the component resides in. Default to white color
 *
 * @example
 * ... component declaration
 * const [value, setValue] = useState<string|undefined>('')
 *
 * return (
 *      <InputGoogle value={value} setValue={setValue} />
 * )
 */
const InputGoogle = ({
    value,
    setValue = () => {},
    labelColor = '#fff',
    ...props
}: Props & React.ComponentProps<'input'>) => {
    const [isFocus, setFocus] = useState<boolean>(false);

    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function transitionOnFocus() {
        setFocus(true);
        if (spanRef.current) {
            spanRef.current.style.top = others.topFocus;
            spanRef.current.style.fontSize = others.fontSizeFocus;
        }
    }

    function transitionOffFocus() {
        setFocus(false);

        if (value) return;

        if (spanRef.current) {
            spanRef.current.style.top = others.topRelease;
            spanRef.current.style.fontSize = others.fontSizeRelease;
        }
    }

    function handleClickOnLabel() {
        inputRef.current?.focus();
    }

    const inputBorder = isFocus
        ? `${others.border} ${others.borderFocus}`
        : `${others.border} ${others.borderRelease}`;
    const labelTextColor = isFocus
        ? `${others.textFocus}`
        : `${others.textRelease}`;

    return (
        <div style={styles.container}>
            <input
                id="will-input-google"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                style={{
                    ...styles.input,
                    border: inputBorder,
                }}
                onFocus={transitionOnFocus}
                onBlur={transitionOffFocus}
                {...props}
            />
            <span
                ref={spanRef}
                style={{
                    ...styles.label,
                    color: labelTextColor,
                    backgroundColor: labelColor,
                }}
                onClick={handleClickOnLabel}
            >
                Enter Email or Phone number
            </span>
        </div>
    );
};

export default InputGoogle;
