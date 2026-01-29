type ElementStyle = 'container' | 'img' | 'frame' | 'controller';
type ControllerButtons =
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'resizeDown'
    | 'rotate'
    | 'rotateBottom'
    | 'label'
    | 'buttonBackground'
    | 'buttonBackgroundDown';

type MainElementStyles = {
    [K in ElementStyle | ControllerButtons]: React.CSSProperties;
};

const resize: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'white',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    transition: 'all .1s linear',
    cursor: 'pointer',
};

const background: React.CSSProperties = {
    visibility: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    zIndex: -1,
    transition: 'all .1s linear',
};

const MainElementStyles: MainElementStyles = {
    container: {
        position: 'relative',
        border: 'solid 4px #000',
        borderStyle: 'dashed',
        borderRadius: '50%',
        width: '100%',
        maxWidth: '508px',
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    frame: {
        borderRadius: '50%',
        boxSizing: 'border-box',
        padding: '50px',
        backgroundColor: 'white',
        overflow: 'hidden',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '500px',
        aspectRatio: 1 / 1,
        position: 'relative',
    },
    img: {
        objectFit: 'contain',
        position: 'absolute',
        userSelect: 'none',
        top: 0,
        left: 0,
        display: 'block',
        zIndex: 0,
    },
    controller: {
        position: 'absolute',
        userSelect: 'none',
        border: 'solid 3px #6924d5',
        top: 0,
        left: 0,
    },
    resizeDown: {
        color: 'white',
        backgroundColor: '#6924d5',
    },
    topLeft: {
        ...resize,
        top: '-10px',
        left: '-10px',
    },
    topRight: {
        ...resize,
        top: '-10px',
        right: '-10px',
    },
    bottomLeft: {
        ...resize,
        bottom: '-10px',
        left: '-10px',
    },
    bottomRight: {
        ...resize,
        bottom: '-10px',
        right: '-10px',
    },
    buttonBackground: {
        ...background,
    },
    buttonBackgroundDown: {
        ...background,
        visibility: 'visible',
    },
    rotate: {
        ...resize,
        top: '-50px',
        width: '30px',
        height: '30px',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'alias',
    },
    rotateBottom: {
        ...resize,
        display: 'none',
        bottom: '-50px',
        width: '30px',
        height: '30px',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'alias',
    },
    label: {
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transformOrigin: 'left',
        transform: 'translate(-50%, 0)',
        margin: 0,
        color: 'black',
        width: 'max-content',
    },
};

export default MainElementStyles;
