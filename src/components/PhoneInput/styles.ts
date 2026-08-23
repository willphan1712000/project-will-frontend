type Props = 'container' | 'dropdownWrapper' | 'inputWrapper';

type Styles = {
    [K in Props]: React.CSSProperties;
};

const styles: Styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
    },
    dropdownWrapper: {
        width: '120px',
        flexShrink: 0,
    },
    inputWrapper: {
        flex: 1,
    },
};

export default styles;
