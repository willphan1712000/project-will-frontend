type ElementStyle = 'imageEditor' | 'wrapper' | 'img' | 'frame' | 'buttons';
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
        paddingLeft: '30px',
        paddingRight: '30px',
    },
    frame: {
        padding: '50px',
        backgroundColor: 'white',
        border: 'solid 4px #000',
        borderStyle: 'dashed',
        borderRadius: '50%',
        overflow: 'hidden',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '500px',
        aspectRatio: 1 / 1,
        position: 'relative',
    },
    wrapper: {
        position: 'absolute',
        transformOrigin: 'top left',
        userSelect: 'none',
    },
    img: {
        objectFit: 'contain',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        zIndex: 1,
        transform: 'translate(-50%, -50%)',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        padding: '30px',
    },
};

export default imageEditorStyles;
