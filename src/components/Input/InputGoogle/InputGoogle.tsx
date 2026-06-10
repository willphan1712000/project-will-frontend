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

    const borderWhenFocused = isFocus
        ? `${others.border} ${options ? options.focusColor : others.borderFocus}`
        : `${others.border} ${others.borderRelease}`;
    const labelColorWhenFocused = isFocus
        ? `${options ? options.focusColor : others.textFocus}`
        : `${others.textRelease}`;

    function spanPositionWhenFocused() {
        if (spanRef.current) {
            spanRef.current.style.top = others.topFocus;
            spanRef.current.style.fontSize = others.fontSizeFocus;
        }
    }

    function spanPositionWhenNotFocused() {
        if (spanRef.current) {
            spanRef.current.style.top = others.topRelease;
            spanRef.current.style.fontSize = others.fontSizeRelease;
        }
    }

    function onFocus() {
        setFocus(true);
        spanPositionWhenFocused();
    }

    function offFocus() {
        setFocus(false);
        if (value) return;
        spanPositionWhenNotFocused();
    }

    function focus() {
        inputRef.current?.focus();
    }

    useEffect(() => {
        if (value) spanPositionWhenFocused();
    }, [value]);

    return (
        <div style={styles.container}>
            <input
                id={crypto.randomUUID()}
                name="will-input-google"
                ref={inputRef}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                type="text"
                style={{
                    ...styles.input,
                    border: borderWhenFocused,
                }}
                onFocus={onFocus}
                onBlur={offFocus}
                {...props}
            />
            <span
                ref={spanRef}
                style={{
                    ...styles.label,
                    color: labelColorWhenFocused,
                }}
                onClick={focus}
            >
                {label}
            </span>
        </div>
    );
};

export default InputGoogle;
