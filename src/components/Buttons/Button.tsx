import { createContext, useContext } from 'react';
import Gradient from './gradient/Gradient';
import Solid from './solid/Solid';

interface Props {
    buttonType?: 'gradient' | 'solid' | 'normal';
}

interface Data {
    content?: string;
    main?: string;
    text?: string;
    first?: string;
    second?: string;
    isLoading?: boolean;
}

const ButtonContext = createContext<
    (Data & { props?: React.ComponentProps<'button'> }) | undefined
>(undefined);

export function useButtonContext() {
    const data = useContext(ButtonContext);

    if (data === undefined) {
        throw new Error('Select Context is undefined');
    }

    return data;
}

/**
 *
 * @param buttonType type of button, default is normal button
 * @param content string content inside the button
 * @param main main color of the button
 * @param text text color
 * @param first first color when using gradient button or solid button, default is #3e8fbc
 * @param second second color when using gradient button, default is #aa6392
 * @returns button UI component
 */
const Button = ({
    buttonType = 'normal',
    content = '',
    main = '#111723',
    first = '#3e8fbc',
    second = '#aa6392',
    text = '#fff',
    isLoading = false,
    ...props
}: Props & Data & React.ComponentProps<'button'>) => {
    switch (buttonType) {
        case 'gradient':
            return (
                <ButtonContext.Provider
                    value={{
                        content,
                        main,
                        first,
                        second,
                        text,
                        props,
                        isLoading,
                    }}
                >
                    <Gradient />
                </ButtonContext.Provider>
            );
        case 'solid':
            return (
                <ButtonContext.Provider
                    value={{ content, main, first, text, props, isLoading }}
                >
                    <Solid />
                </ButtonContext.Provider>
            );
        default:
            return <button {...props}>{content}</button>;
    }
};

export default Button;
