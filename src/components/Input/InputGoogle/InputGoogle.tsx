import { useEffect, useRef, useState } from 'react';
import styles, { others } from './InputGoogle.styles';

interface Props {
    value?: string;
    setValue?: (value?: string) => void;
    label?: string;
    options?: {
        focusColor: string;
    };
}

/**
 * Input component shadows input box implemented by Google
 *
 * @link
 * https://accounts.google.com
 *
 * @param value value of input
 * @param setValue set value function
 * @param label set label
 * @param options options object containing focusColor property -> color when input is focused
 *
 * @example
 * ... component declaration
 * const [value, setValue] = useState<string|undefined>('')
 *
 * return (
 *      <InputGoogle value={value} setValue={setValue} label="Input Google Component Label" options={{ focusColor: "yellow" }}/>
 * )
 */
const InputGoogle = ({
    value = '',
    setValue = () => {},
    label = 'Input Google Component Label',
    options,
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
        ? `${others.border} ${options ? options.focusColor : others.borderFocus}`
        : `${others.border} ${others.borderRelease}`;
    const labelTextColor = isFocus
        ? `${options ? options.focusColor : others.textFocus}`
        : `${others.textRelease}`;

    useEffect(() => {
        transitionOnFocus();
        transitionOffFocus();
    }, []);

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
                }}
                onClick={handleClickOnLabel}
            >
                {label}
            </span>
        </div>
    );
};

export default InputGoogle;
