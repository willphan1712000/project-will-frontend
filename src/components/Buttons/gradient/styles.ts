type Props = | "container" | "btn" | "btnAfter" | "label" | "labelBefore" | "labelAfter" | "p" | "neon"

type Styles = {
    [K in Props]: React.CSSProperties
}

const borderRadius = '20px'

const styles = (first: string, second: string) => {
    const styles: Styles = {
        container: {
          position: "relative",
          borderRadius,
          padding: '3px'
        },
        btn: {
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2px',
          borderRadius,
          backgroundColor: `${first}`,
          backgroundImage: `linear-gradient(43deg, ${first} 0%, ${second} 100%)`,
          border: "none",
          cursor: 'pointer',
        },
        btnAfter: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            content: '""',
            zIndex: 0,
            backgroundColor: `${first}`,
            backgroundImage: `linear-gradient(43deg, ${first} 0%, ${second} 100%)`,
            filter: 'blur(10px)',
        },
        label: {
          backgroundColor: '#111723',
          borderRadius,
          padding: '0.5rem 2rem',
          color: 'white',
        },
        labelBefore: {
            position: 'absolute',
            top: '20%',
            right: '50%',
            width: '50%',
            height: '50%',
            content: '""',
            zIndex: 0,
            backgroundColor: `${first}`,
            filter: 'blur(15px)',
        },
        labelAfter: {
            position: 'absolute',
            top: '20%',
            left: '50%',
            width: '50%',
            height: '50%',
            content: '""',
            zIndex: 0,
            backgroundColor: `${second}`,
            filter: 'blur(20px)',
        },
        p: {
          position: 'relative',
          zIndex: 1,
          margin: 0
        },
        neon: {
          content: '""',
          background: 'conic-gradient(transparent 270deg, green, transparent)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          aspectRatio: 1,
          width: '100%'
        }
    }

    return styles
  };
  
  export default styles;
  