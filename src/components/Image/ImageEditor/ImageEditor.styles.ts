type ElementStyle = 'imageEditor' | 'buttons' | 'instruction';
type ImageEditorStyle = {
    [K in ElementStyle]: React.CSSProperties;
};

const imageEditorStyles: ImageEditorStyle = {
    imageEditor: {
        width: '100vw',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        backdropFilter: 'blur(20px)',
        zIndex: 99,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        padding: '30px',
    },
    instruction: {
        fontWeight: 'bold',
        fontSize: '20px',
    },
};

export default imageEditorStyles;
