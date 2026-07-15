import { createContext, useContext } from 'react';
import WUII from '..';

export type Data = {
    onChange?: (value: string) => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    config?: {
        backgroundColor?: string;
        textColor?: string;
        hoverBackgroundColor?: string;
    };
};

export type ContextDataType = (WUII & Data) | undefined;

export const MyContext = createContext<ContextDataType>(undefined);

export default function useMyContext() {
    const data = useContext(MyContext);

    if (data === undefined) throw new Error('Select context is undefined');

    return data;
}
