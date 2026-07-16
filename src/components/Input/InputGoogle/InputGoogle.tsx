import { useEffect, useRef, useState } from 'react';
import styles, { others } from './InputGoogle.styles';
import Info from '@/src/components/Info/Info';
import WUII from '../..';

/**
 * Input component shadows input box implemented by Google
 *
 * @link
 * https://accounts.google.com
 *
 * @param value - value of input
 * @param setValue - set value function
 * @param label - set label
 * @param description - description tooltip text shown on hover
 * @param isReadOnly - whether the input is read-only
 * @param styling - styling configurations (focusColor, backgroundColor, textColor, borderColor)
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState<string|undefined>('')
 *
 * return (
 *      <InputGoogle
 *          value={value}
 *          setValue={setValue}
 *          label="Input Google Component Label"
 *          description="Input Google Description"
 *          isReadOnly={false}
 *          styling={{
 *              focusColor: "yellow",
 *              backgroundColor: "white",
 *              textColor: "black",
 *              borderColor: "gray"
 *          }}
 *      />
 * )
 * ```
 */
const InputGoogle = ({
    value = '',
    setValue = () => {},
    label = 'Input Google Component Label',
    description = 'Input Google Description',
    isReadOnly = false,
    styling,
    ...props
}: WUII<string> & React.ComponentProps<'input'>) => {
    const [isFocus, setFocus] = useState<boolean>(false);

    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const backgroundColor = styling?.backgroundColor
        ? styling.backgroundColor
        : others.backgroundColor;
    const textColor = styling?.textColor
        ? styling.textColor
        : others.textRelease;
    const borderColor = styling?.borderColor
        ? styling.borderColor
        : others.borderRelease;
    const borderWhenFocused = isFocus
        ? `${others.border} ${styling?.focusColor ? styling.focusColor : others.borderFocus}`
        : `${others.border} ${borderColor}`;
    const labelColorWhenFocused = isFocus
        ? `${styling?.focusColor ? styling.focusColor : others.textFocus}`
        : `${textColor}`;

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
                readOnly={isReadOnly}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                style={{
                    ...styles.input,
                    border: borderWhenFocused,
                    backgroundColor,
                    color: textColor,
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
                    backgroundColor,
                }}
                onClick={focus}
            >
                {label}
                <div style={styles.info}>
                    <Info
                        message={
                            isReadOnly ? 'Locked - Read Only' : description
                        }
                        options={{
                            backgroundColor: textColor,
                            color: backgroundColor,
                        }}
                    />
                </div>
            </span>
        </div>
    );
};

export default InputGoogle;
