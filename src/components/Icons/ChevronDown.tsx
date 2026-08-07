import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
}

const ChevronDown = ({
    size = 24,
    color = 'currentColor',
    ...props
}: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
};

export default ChevronDown;
