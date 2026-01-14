type ElementName = 'controllerContainer' | 'controller' | 'size';

type ControllerStyle = {
    [K in ElementName]: React.CSSProperties;
};

const controllerStyles: ControllerStyle = {
    controllerContainer: {
        position: 'absolute',
        transformOrigin: 'top left',
        userSelect: 'none',
    },
    controller: {
        position: 'absolute',
        userSelect: 'none',
        border: 'solid 3px #6924d5',
        zIndex: 1,
        top: 0,
        left: 0,
        transform: 'translate(-50%, -50%)',
    },
    size: {
        backgroundColor: '#fff',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        transition: 'all .1s linear',
    },
};

export default controllerStyles;
