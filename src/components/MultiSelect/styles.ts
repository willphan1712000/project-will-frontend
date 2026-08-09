type Props =
    | 'select_box'
    | 'value'
    | 'eachValue'
    | 'closeEach'
    | 'close'
    | 'element'
    | 'dropdown'
    | 'dropdown_border'
    | 'search_border'
    | 'search'
    | 'container'
    | 'info';

type Styles = {
    [K in Props]: React.CSSProperties;
};

const styles: Styles = {
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
    },
    select_box: {
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
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
        height: '100%',
        borderRadius: '5px',
        padding: '5px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1rem',
        gap: '5px',
    },
    closeEach: {
        borderRadius: '50%',
        aspectRatio: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000',
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
        fontSize: '1rem',
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
        maxHeight: '300px',
        overflowY: 'auto',
        backgroundColor: 'white',
        zIndex: 9999,
    },
    dropdown_border: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    search_border: {
        position: 'sticky',
        top: 0,
        left: 0,
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: 'white',
    },
    search: {
        width: '100%',
        borderRadius: '0',
        padding: '10px',
        border: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxSizing: 'border-box',
        outline: 'none',
    },
    info: {
        width: '20px',
        aspectRatio: 1,
    },
};

export default styles;
