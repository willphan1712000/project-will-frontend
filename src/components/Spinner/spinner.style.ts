import React from 'react';

export const keyframeStyles = `
  @keyframes allinclicks-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes allinclicks-shine-sweep {
    0% {
      background-position: 200% center;
    }
    100% {
      background-position: -200% center;
    }
  }
`;

export const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
    },
    circleSpinner: {
        width: '20px',
        height: '20px',
        border: '4px solid rgba(255, 255, 255, 0.2)',
        borderTopColor: '#ffffff',
        borderRadius: '50%',
        animation: 'allinclicks-spin 1s linear infinite',
    },
    text: {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '1.2rem',
        fontWeight: 600,
        letterSpacing: '2px',
        background:
            'linear-gradient(110deg, #919191 40%, #ffffff 50%, #919191 60%)',
        backgroundSize: '200% auto',
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        animation: 'allinclicks-shine-sweep 3s linear infinite',
    },
};
