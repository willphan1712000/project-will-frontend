import { createContext, useContext } from 'react';
import WUII from '..';

export type Data = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ContextDataType = (WUII & Data) | undefined;

export const MyContext = createContext<ContextDataType>(undefined);

export default function useMyContext() {
    const data = useContext(MyContext);

    if (data === undefined) throw new Error('Select context is undefined');

    return data;
}
