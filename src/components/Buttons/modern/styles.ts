type Props = 'btn';

type Styles = {
    [K in Props]: React.CSSProperties;
};

const styles = (first: string) => {
    const styles: Styles = {
        btn: {
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
            borderRadius: '10px',
            color: first,
            backgroundColor: `color-mix(in srgb, ${first} 20%, transparent)`,
            fontSize: '15px',
            transition: 'all .1s linear',
            whiteSpace: 'nowrap',
        },
    };
    return styles;
};

export default styles;
