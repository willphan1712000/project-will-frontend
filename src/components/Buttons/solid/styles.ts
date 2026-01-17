type Props = 'btn' | 'btnAfter' | 'label' | 'labelBefore' | 'labelAfter' | 'p';

type Styles = {
    [K in Props]: React.CSSProperties;
};

const styles = (first: string) => {
    const styles: Styles = {
        btn: {
            cursor: 'pointer',
            position: 'relative',
            zIndex: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px',
            borderRadius: '0.75rem',
            backgroundColor: first,
            border: 'none',
        },
        btnAfter: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundColor: first,
            filter: 'blur(10px)',
        },
        label: {
            borderRadius: '0.75rem',
            padding: '0.5rem 2rem',
            color: 'white',
        },
        labelBefore: {
            position: 'absolute',
            top: '20%',
            right: '50%',
            width: '50%',
            height: '50%',
            content: '""', // See note below
            zIndex: 0,
            backgroundColor: first,
            filter: 'blur(15px)',
        },
        labelAfter: {
            position: 'absolute',
            top: '20%',
            left: '50%',
            width: '50%',
            height: '50%',
            content: '""', // See note below
            zIndex: 0,
            filter: 'blur(20px)',
        },
        p: {
            zIndex: 1,
            position: 'relative',
            margin: 0,
        },
    };
    return styles;
};

export default styles;
