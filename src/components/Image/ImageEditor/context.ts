import TransformOperation from '@/src/utilities/Transform/TransformOperation';
import { createContext, useContext } from 'react';

export type Data = {
    refs: {
        [key: string]: React.RefObject<HTMLDivElement | null> | undefined;
    };
    imgRefs: {
        img: React.RefObject<HTMLImageElement | null> | undefined;
    };
    src?: string;
    transformOperation: TransformOperation;
};

export type ContextDataType = Data | undefined;

export const MyContext = createContext<ContextDataType>(undefined);

export default function useMyContext() {
    const data = useContext(MyContext);

    if (data === undefined) throw new Error('Context is undefined');

    return data;
}
