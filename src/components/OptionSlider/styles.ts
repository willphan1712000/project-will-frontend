type Props = | "border" | "background" | "options" | "element";

type Styles = {
    [K in Props]: React.CSSProperties
}

const styles: Styles = {
    border: {
        borderRadius: '10px',
        overflow: 'auto',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        aspectRatio: '4',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
    },
    background: {
        position: 'relative',
        width: '100%',
        height: '100%',
        opacity: '0.3',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
    },
    options: {
        height: '100%',
        padding: '5px',
        gap: '5px',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        margin: 0,
    },
    element: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        width: 'auto',
        height: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '50%',
        overflow: 'hidden',
        border: 'solid 1px #000',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
    },
}

export default styles