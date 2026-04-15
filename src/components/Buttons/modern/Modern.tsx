import { useState } from 'react';
import styles from './styles';

type Props = {
    children?: React.ReactNode;
    first?: string;
    hover?: boolean;
    shadow?: boolean;
};

/**
 * Modern button component wrapping around anchor tag <a>
 * @param first Primary color, default to white
 * @param hover turn on hover effect
 * @param shadow turn on shadow effect
 * @returns
 */
const Modern = ({
    first = '#fff',
    children,
    style,
    hover = false,
    shadow = false,
    ...props
}: Props & React.ComponentProps<'a'>) => {
    const [isHover, setHover] = useState<boolean>(false);
    const handleEnter = () => {
        if (!hover) return;
        setHover(true);
    };
    const handleLeave = () => {
        if (!hover) return;
        setHover(false);
    };
    const transparentColor = `color-mix(in srgb, ${first} 20%, transparent)`;
    const borderFirst = `solid 1px ${first}`;
    const shadowTransparent = `${transparentColor} 0px 0px 15px 2px`;
    const borderTransparent = `solid 1px ${transparentColor}`;

    return (
        <a
            {...props}
            style={{
                ...styles(first).btn,
                border: hover
                    ? isHover
                        ? `${borderFirst}`
                        : `${borderTransparent}`
                    : `${borderFirst}`,
                boxShadow: hover
                    ? isHover
                        ? `${shadowTransparent}`
                        : ``
                    : shadow
                      ? `${shadowTransparent}`
                      : '',
                ...style,
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {children}
        </a>
    );
};

export default Modern;
