type Props =
    | 'container'
    | 'border'
    | 'background'
    | 'options'
    | 'element'
    | 'info';

type Styles = {
    [K in Props]: React.CSSProperties;
};

const styles: Styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        width: '100%',
        height: '100%',
    },
    border: {
        borderRadius: '10px',
        overflow: 'auto',
        aspectRatio: '4',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
    },
    background: {
        position: 'relative',
        width: '100%',
        height: '100%',
        opacity: '0.3',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
    },
    options: {
        height: '100%',
        padding: '5px',
        gap: '5px',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        margin: 0,
    },
    element: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        width: 'auto',
        height: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '50%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
    },
    info: {
        width: '20px',
        aspectRatio: 1,
    },
};

export default styles;
