import { createContext, useContext } from "react";
import { Options } from "./MultiSelect";

export type Data = {
    // some data type does here
    options: Options,
    value: string[],
    onChange: React.Dispatch<React.SetStateAction<string[]>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type ContextDataType = Data | undefined

export const MyContext = createContext<ContextDataType>(undefined)

export default function useMyContext() {
    const data = useContext(MyContext)

    if ( data === undefined )
        throw new Error("Select context is undefined")
        
    return data
}