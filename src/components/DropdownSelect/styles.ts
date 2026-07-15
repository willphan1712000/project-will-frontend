type Props =
    | 'select_box'
    | 'value'
    | 'close'
    | 'element'
    | 'dropdown'
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
        marginRight: 'auto',
    },
    close: {
        padding: '1%',
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
        zIndex: 99,
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
        borderRadius: '0',
        padding: '5px',
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
