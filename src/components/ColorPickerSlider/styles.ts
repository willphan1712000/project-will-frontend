type Props = 'container' | 'border' | 'thumb' | 'label' | 'info';

type Styles = {
    [K in Props]: React.CSSProperties;
};

const styles: Styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
    },
    border: {
        background:
            'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(0, 100%, 50%))',
        borderRadius: '10px',
        aspectRatio: 20,
        cursor: 'pointer',
        appearance: 'none',
        outline: 'none',
        position: 'relative',
    },
    thumb: {
        borderRadius: '50%',
        aspectRatio: 1,
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        border: 'solid 2px #fff',
    },
    label: {
        position: 'absolute',
        bottom: '200%',
        transform: 'translateX(-50%)',
        borderRadius: '5px',
        padding: '5px',
        fontSize: '15px',
        transition: 'scale .1s linear',
        transformOrigin: 'bottom left',
    },
    info: {
        width: '20px',
        aspectRatio: 1,
    },
};

export default styles;
