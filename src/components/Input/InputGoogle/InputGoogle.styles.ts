type Name = 'input' | 'container' | 'label';

type Styles = {
    [K in Name]: React.CSSProperties;
};

export const others = {
    topRelease: '50%',
    fontSizeRelease: '16px',
    topFocus: '0',
    fontSizeFocus: '14px',
    border: 'solid 1px',
    borderFocus: '#0957d0',
    borderRelease: '#cbcbcb',
    textFocus: '#0957d0',
    textRelease: '#000',
};

const styles: Styles = {
    input: {
        width: '100%',
        border: `${others.border} ${others.borderRelease}`,
        borderRadius: '6px',
        padding: '10px',
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
    },
};

export default styles;
