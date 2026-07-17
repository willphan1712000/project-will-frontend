import { JSX } from 'react';

export type Options = {
    label: JSX.Element;
    value: string;
}[];

export type Range = {
    min: string;
    max: string;
};

/**
 * Will UI Interface
 * - Dictate all UI component to be implementing this interface for ultimate consistency
 * - Take a generic type T which is the data structure the current component is operating on
 */
export default interface WUII<T = any> {
    value?: T;
    setValue?: (value?: T) => void;
    options?: Options;
    range?: Range;
    label?: string;
    isReadOnly?: boolean;
    description?: string;
    styling?: {
        primaryColor?: string;
        backgroundColor?: string;
        textColor?: string;
        hoverBackgroundColor?: string;
        focusColor?: string;
        borderColor?: string;
        destructive?: string;
        width?: string;
    };
    config?: {
        default?: string;
        accept?: string;
    };
}
