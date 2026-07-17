import React, { useEffect, useRef, useState } from 'react';
import useMyContext from './context';
import Search from './Search';
import styles from './styles';

const Dropdown = () => {
    const { options, value, setValue, setOpen, styling } = useMyContext();
    const {
        backgroundColor,
        textColor: color,
        hoverBackgroundColor,
    } = styling!;
    const [isVisible, setVisible] = useState<boolean>(true);
    const [optionsCopy, setOption] = useState(options);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleResize = () => {
        const dropdown = dropdownRef.current as HTMLDivElement;
        const dimension = dropdown.getBoundingClientRect();
        const distanceToBottom = window.innerHeight - dimension.bottom;
        const distanceToTop = dimension.top;
        if (distanceToBottom < 0) {
            setVisible(false);
        }

        if (distanceToTop < 0) {
            setVisible(true);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('scroll', handleResize);
        return () => {
            window.removeEventListener('scroll', handleResize);
        };
    }, []);

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
        if (targetNode) targetNode.style.backgroundColor = 'transparent';
    };

    return (
        <div
            ref={dropdownRef}
            style={
                isVisible
                    ? {
                          ...styles.dropdown,
                          top: 'calc(100% + 5px)',
                          backgroundColor,
                          color,
                      }
                    : {
                          ...styles.dropdown,
                          bottom: 'calc(100% + 5px)',
                          backgroundColor,
                          color,
                      }
            }
        >
            {/* Search */}
            <Search options={options} onSearch={setOption} />
            <div
                style={styles.dropdown_border}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {optionsCopy &&
                    optionsCopy.map((option, key: number) => (
                        <div
                            key={key}
                            data-hover-target="true"
                            style={{
                                ...styles.element,
                                color,
                            }}
                            onClick={() => {
                                if (setValue && value) {
                                    if (value.includes(option.value))
                                        setValue(value);
                                    else setValue([...value, option.value]);
                                }
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
