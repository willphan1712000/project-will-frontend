type Props = "slider_border" | "thumb" | "thumb_shadow" | "fill" | "rest" | "value"

type Styles = {
    [K in Props]: React.CSSProperties
}

const styles: Styles = {
    slider_border: {
        position: "relative",
        display: "flex",
        gap: "5px",
        flexDirection: "column",
        height: "10px",
    },
    thumb: {
        width: "17px",
        height: "17px",
        cursor: "pointer",
        position: "absolute",
        borderRadius: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
    },
    thumb_shadow: {
        content: '""',
        position: "absolute",
        top: "-9px",
        left: "-9px",
        width: "35px",
        height: "35px",
        opacity: 0.2,
        zIndex: -1,
        borderRadius: "50%",
        scale: "0",
        transition: "scale .1s linear",
    },
    fill: {
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        borderRadius: "5px",
        cursor: "pointer",
    },
    rest: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        opacity: .3,
        width: "100%",
        height: "70%",
        borderRadius: "5px",
        cursor: "pointer",
    },
    value: {
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        transformOrigin: "bottom left",
        backgroundColor: "#f0f0f7",
        borderRadius: "5px",
        padding: "5px",
        scale: "0",
        transition: "scale .1s linear",
    }
}

export default styles