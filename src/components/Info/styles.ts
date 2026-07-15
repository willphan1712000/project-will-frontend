type InfoElement = 'container' | 'message';
type Styles = { [key in InfoElement]: React.CSSProperties };

const styles: Styles = {
    container: {
        cursor: 'help',
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    message: {
        borderRadius: '20px',
        padding: '10px',
        margin: '0',
        position: 'absolute',
        fontSize: '13px',
        width: '200px',
        height: 'auto',
        overflowWrap: 'break-word',
        textAlign: 'center',
        transition: 'all 0.08s linear',
        transformOrigin: 'bottom left',
    },
};

const updatedStyles = Object.fromEntries(
    Object.entries(styles).map(([key, value]) => [
        key,
        { ...value, boxSizing: 'border-box' },
    ])
) as Styles;

export default updatedStyles;
