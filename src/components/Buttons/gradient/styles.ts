type Props =
    | 'container'
    | 'btn'
    | 'btnAfter'
    | 'labelWrapper'
    | 'labelBefore'
    | 'label'
    | 'labelAfter'
    | 'p';

type Styles = {
    [K in Props]: React.CSSProperties;
};

const borderRadius = '20px';

const styles = (first: string, second: string) => {
    const styles: Styles = {
        container: {
            position: 'relative',
            borderRadius,
            padding: '1px',
        },
        btn: {
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px',
            borderRadius,
            backgroundColor: `${first}`,
            backgroundImage: `linear-gradient(${120}deg, ${first} 0%, ${second} 100%)`,
            border: 'none',
            cursor: 'pointer',
            width: '100%',
        },
        btnAfter: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            content: '""',
            zIndex: 0,
            backgroundColor: `${first}`,
            backgroundImage: `linear-gradient(${120}deg, ${first} 0%, ${second} 100%)`,
            filter: 'blur(8px)',
            borderRadius,
        },
        labelWrapper: {
            position: 'relative',
            width: '100%',
        },
        label: {
            backgroundColor: '#111723',
            borderRadius,
            padding: '0.5rem 2rem',
            color: 'white',
        },
        labelBefore: {
            position: 'absolute',
            top: '20%',
            right: '50%',
            width: '50%',
            height: '50%',
            content: '""',
            zIndex: 0,
            backgroundColor: `${first}`,
            filter: 'blur(15px)',
        },
        labelAfter: {
            position: 'absolute',
            top: '20%',
            left: '50%',
            width: '50%',
            height: '50%',
            content: '""',
            zIndex: 0,
            backgroundColor: `${second}`,
            filter: 'blur(20px)',
        },
        p: {
            position: 'relative',
            zIndex: 1,
            margin: 0,
        },
    };

    return styles;
};

export default styles;
