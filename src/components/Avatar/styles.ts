type Name = 'upload' | 'container' | 'remove' | 'edit' | 'image' | 'unknown';

type Styles = {
    [K in Name]: React.CSSProperties;
};

export const others = {
    iconSize: '20',
};

const button: React.CSSProperties = {
    fontSize: '0.8rem',
    border: 'none',
    borderRadius: '15px',
    padding: '3%',
    display: 'flex',
    gap: '5px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'absolute',
};

const styles: Styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
    },
    image: {
        borderRadius: '50%',
        background: 'white',
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    },
    unknown: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    upload: {
        ...button,
        bottom: 0,
        right: 0,
    },
    remove: {
        ...button,
        top: 0,
        right: 0,
    },
    edit: {
        ...button,
    },
};

export default styles;
