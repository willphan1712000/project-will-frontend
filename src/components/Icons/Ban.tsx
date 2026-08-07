import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
}

const Ban = ({ size = 24, color = 'currentColor', ...props }: Props) => {
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
            <circle cx="12" cy="12" r="10" />
            <path d="m4.9 4.9 14.2 14.2" />
        </svg>
    );
};

export default Ban;
