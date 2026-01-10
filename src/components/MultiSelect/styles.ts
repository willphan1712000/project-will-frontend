type Props =
    | 'select_box'
    | 'value'
    | 'eachValue'
    | 'closeEach'
    | 'close'
    | 'element'
    | 'dropdown'
    | 'search_border'
    | 'search';

type Styles = {
    [K in Props]: React.CSSProperties;
};

const styles: Styles = {
    select_box: {
        borderRadius: '10px',
        border: 'solid 1px #dadada',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
    },
    value: {
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',
        flexWrap: 'wrap',
    },
    eachValue: {
        borderRadius: '5px',
        backgroundColor: '#f0f0f7',
        padding: '5px',
        position: 'relative',
    },
    closeEach: {
        position: 'absolute',
        top: 0,
        right: 0,
        transform: 'translate(50%, -50%)',
        borderRadius: '50%',
        backgroundColor: '#fc2c2cf0',
        aspectRatio: 1,
        width: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        transition: 'scale .2s linear',
        transformOrigin: 'top right',
    },
    close: {
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    element: {
        display: 'flex',
        padding: '5px',
        borderRadius: '10px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
    },
    dropdown: {
        position: 'absolute',
        boxSizing: 'border-box',
        width: '100%',
        left: '0',
        display: 'flex',
        flexDirection: 'column',
        border: 'solid 1px #dadada',
        borderRadius: '10px',
        padding: '5px',
        maxHeight: '300px',
        overflowY: 'auto',
        backgroundColor: 'white',
    },
    search_border: {
        position: 'sticky',
        top: 0,
        left: 0,
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: 'white',
        marginBottom: '5px',
    },
    search: {
        width: '100%',
        borderRadius: '5px',
        padding: '5px',
        border: 'solid 1px #dadada',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
};

export default styles;
