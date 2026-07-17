import React, { useEffect, useRef, useState } from 'react';
import useMyContext from './context';
import Search from './Search';
import styles from './styles';

/**
 * Private Dropdown component -> handle dropdown list including search bar
 */
const Dropdown = () => {
    const { options, setValue, setOpen, styling } = useMyContext();
    const {
        backgroundColor,
        textColor: color,
        hoverBackgroundColor = '#f0f0f0',
    } = styling!;

    const [isVisible, setVisible] = useState<boolean>(true);
    const [optionsCopy, setOption] = useState(options);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleResize = () => {
        const dropdown = dropdownRef.current as HTMLDivElement;
        const dimension = dropdown.getBoundingClientRect();
        const distanceToBottom = window.innerHeight - dimension.bottom;
        const distanceToTop = dimension.top;
        if (distanceToBottom < 0) setVisible(false);
        if (distanceToTop < 0) setVisible(true);
    };

    const handleMouseOver = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const targetNode = (e.target as HTMLElement).closest(
            '[data-hover-target="true"]'
        ) as HTMLDivElement;
        if (targetNode)
            targetNode.style.backgroundColor = hoverBackgroundColor || '';
    };

    const handleMouseOut = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const targetNode = (e.target as HTMLElement).closest(
            '[data-hover-target="true"]'
        ) as HTMLDivElement;
        if (targetNode)
            targetNode.style.backgroundColor = backgroundColor || 'transparent';
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('scroll', handleResize);
        return () => window.removeEventListener('scroll', handleResize);
    }, []);

    const isVisibleVar = isVisible
        ? {
              ...styles.dropdown,
              top: 'calc(100% + 5px)',
          }
        : {
              ...styles.dropdown,
              bottom: 'calc(100% + 5px)',
          };

    return (
        <div
            ref={dropdownRef}
            style={{
                ...isVisibleVar,
            }}
        >
            {/* Search */}
            <Search options={options} onSearch={setOption} />
            <div
                style={{
                    ...styles.elementList,
                    backgroundColor,
                    color,
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {optionsCopy &&
                    optionsCopy.map((option, key) => (
                        <div
                            data-hover-target="true"
                            key={key}
                            style={{
                                ...styles.element,
                                color,
                            }}
                            onClick={() => {
                                if (setValue) setValue(option.value);
                                setOpen((prev) => !prev);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dropdown;
