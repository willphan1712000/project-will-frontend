type Name = 'input' | 'container' | 'label';

type Styles = {
    [K in Name]: React.CSSProperties;
};

export const others = {
    topRelease: '50%',
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
        height: '40px',
        width: '100%',
        border: `${others.border} ${others.borderRelease}`,
        borderRadius: '6px',
        padding: '10px',
        outline: 'none',
    },
    container: {
        width: '100%',
        position: 'relative',
    },
    label: {
        position: 'absolute',
        top: '50%',
        left: '10px',
        fontSize: '16px',
        transform: 'translateY(-50%)',
        transition: 'all .1s linear',
        padding: '0px 5px',
        backgroundColor: 'white',
    },
};

export default styles;
