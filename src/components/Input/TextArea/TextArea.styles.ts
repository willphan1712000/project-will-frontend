type Name = 'input' | 'container' | 'label';

type Styles = {
    [K in Name]: React.CSSProperties;
};

const labelHeight = 20;

export const others = {
    topRelease: `${labelHeight + 5}px`,
    topFocus: '0',

    fontSizeRelease: '16px',
    fontSizeFocus: '14px',

    borderRelease: '#cbcbcb',
    borderFocus: '#0957d0',

    textRelease: '#000',
    textFocus: '#0957d0',

    border: 'solid 2px',
};

const styles: Styles = {
    input: {
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        border: `${others.border} ${others.borderRelease}`,
        borderRadius: '6px',
        padding: '10px',
        outline: 'none',
        resize: 'none',
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    label: {
        height: `${labelHeight}px`,
        position: 'absolute',
        top: `${labelHeight + 5}px`,
        left: '10px',
        fontSize: '16px',
        transform: 'translateY(-50%)',
        transition: 'all .1s linear',
        padding: '0px 5px',
        backgroundColor: 'white',
    },
};

export default styles;
