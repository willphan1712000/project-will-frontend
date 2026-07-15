import { useEffect, useRef, useState } from 'react';
import useMyContext from './context';
import Search from './Search';
import styles from './styles';

/**
 * Private Dropdown component -> handle dropdown list including search bar
 */
const Dropdown = () => {
    const { options, onChange, setOpen, config } = useMyContext();
    const { backgroundColor, textColor: color, hoverBackgroundColor } = config!;
    const [isVisible, setVisible] = useState<boolean>(true);
    const [keyOnHover, setKeyOnHover] = useState<number>(-1);
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
                backgroundColor,
                color,
            }}
        >
            {/* Search */}
            <Search options={options} onSearch={setOption} />
            {optionsCopy!.map((option, key) => (
                <div
                    key={key}
                    style={{
                        ...styles.element,
                        backgroundColor:
                            keyOnHover === key
                                ? hoverBackgroundColor
                                : backgroundColor,
                        color,
                    }}
                    onClick={() => {
                        onChange!(option.value);
                        setOpen((prev) => !prev);
                    }}
                    onMouseEnter={() => setKeyOnHover(key)}
                    onMouseLeave={() => setKeyOnHover(-1)}
                >
                    {option.label}
                </div>
            ))}
        </div>
    );
};

export default Dropdown;
