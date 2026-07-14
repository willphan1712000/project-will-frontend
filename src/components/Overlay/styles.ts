type StyleElement = 'overlay' | 'child';
type Styles = {
    [key in StyleElement]: React.CSSProperties;
};

const styles: Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100dvw',
        height: '100dvh',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999999,
    },
    child: {
        width: 'fit-content',
        height: 'fit-content',
    },
};

export default styles;
