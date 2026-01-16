type Name = 'upload' | 'container' | 'remove' | 'edit';

type Styles = {
    [K in Name]: React.CSSProperties;
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
