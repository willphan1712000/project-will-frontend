import { useEffect, useRef, useState } from 'react';
import styles, { others } from './TextArea.styles';
import Info from '@/src/components/Info/Info';

interface Props {
    value?: string;
    setValue?: (value?: string) => void;
    label?: string;
    isReadOnly?: boolean;
    description?: string;
    options?: {
        focusColor?: string;
        backgroundColor?: string;
        textColor?: string;
        borderColor?: string;
    };
}

/**
 * Textarea component
 *
 * @param value value of input
 * @param setValue set value function
 * @param label set label
 * @param isReadOnly whether the textarea is read-only
 * @param description description tooltip text shown on hover
 * @param options options object containing styling properties (focusColor, backgroundColor, textColor, borderColor)
 *
 * @example
 * ... component declaration
 * const [value, setValue] = useState<string|undefined>('')
 *
 * return (
 *      <TextArea
 *          value={value}
 *          setValue={setValue}
 *          label="Text Component Label"
 *          description="Text Area Description"
 *          isReadOnly={false}
 *          options={{
 *              focusColor: "yellow",
 *              backgroundColor: "white",
 *              textColor: "black",
 *              borderColor: "gray"
 *          }}
 *      />
 * )
 */
const TextArea = ({
    value = '',
    setValue = () => {},
    label = 'Text Area Component Label',
    isReadOnly = false,
    description = 'Text Area Description',
    options,
    ...props
}: Props & React.ComponentProps<'textarea'>) => {
    const [isFocus, setFocus] = useState<boolean>(false);

    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const backgroundColor = options?.backgroundColor
        ? options.backgroundColor
        : others.backgroundColor;
    const textColor = options?.textColor
        ? options.textColor
        : others.textRelease;
    const borderColor = options?.borderColor
        ? options.borderColor
        : others.borderRelease;
    const borderWhenFocused = isFocus
        ? `${others.border} ${options?.focusColor ? options.focusColor : others.borderFocus}`
        : `${others.border} ${borderColor}`;
    const labelColorWhenFocused = isFocus
        ? `${options?.focusColor ? options.focusColor : others.textFocus}`
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
            <textarea
                id={crypto.randomUUID()}
                name="will-textarea"
                ref={inputRef}
                readOnly={isReadOnly}
                value={value}
                onChange={(e) => setValue(e.target.value)}
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

export default TextArea;
