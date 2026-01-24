type ElementStyle = 'container' | 'img' | 'frame' | 'controller';
type ControllerButtons =
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'resizeDown'
    | 'rotate'
    | 'buttonBackground';

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
};

const MainElementStyles: MainElementStyles = {
    container: {
        position: 'relative',
        border: 'none',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '500px',
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    frame: {
        boxSizing: 'border-box',
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
    // wrapper: {
    //     position: 'absolute',
    //     transformOrigin: 'top left',
    //     userSelect: 'none',
    // },
    img: {
        objectFit: 'contain',
        position: 'absolute',
        transformOrigin: 'top left',
        userSelect: 'none',
        top: 0,
        left: 0,
        display: 'block',
        zIndex: 1,
        // transform: 'translate(-50%, -50%)',
    },
    // controllerContainer: {
    //     position: 'absolute',
    //     transformOrigin: 'top left',
    //     userSelect: 'none',
    // },
    controller: {
        transformOrigin: 'top left',
        position: 'absolute',
        userSelect: 'none',
        border: 'solid 3px #6924d5',
        zIndex: 1,
        top: 0,
        left: 0,
        // transform: 'translate(-50%, -50%)',
    },
    resizeDown: {
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
        backgroundColor: '#f0f0f0a8',
        position: 'absolute',
        top: '-15px',
        left: '-15px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        zIndex: -1,
        transition: 'all .1s linear',
    },
    rotate: {
        position: 'absolute',
        top: '-50px',
        left: 'calc(50% - 15px)',
        width: '30px',
        height: '30px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default MainElementStyles;
