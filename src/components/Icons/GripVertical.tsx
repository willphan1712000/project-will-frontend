import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
}

const GripVertical = ({
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
            fill={color}
            {...props}
        >
            <circle cx="9" cy="5" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="15" cy="5" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="15" cy="19" r="1.5" />
        </svg>
    );
};

export default GripVertical;
