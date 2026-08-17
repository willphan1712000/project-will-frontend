import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties | any } = {
    weekGrid: {
        display: 'flex',
        flexDirection: 'column',
        height: '600px',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'var(--surface)',
    },
    weekHeader: {
        display: 'grid',
        gridTemplateColumns: '60px repeat(7, 1fr)',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-color)',
    },
    timeSpacer: {
        borderRight: '1px solid var(--border-color)',
    },
    dayHeader: {
        textAlign: 'center',
        padding: '12px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    dayHeaderLast: {
        borderRight: 'none',
    },
    dayHeaderToday: {
        color: 'var(--primary)',
    },
    dayHeaderDayName: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
    },
    dayHeaderDayNum: {
        fontSize: '1.2rem',
        fontWeight: 700,
    },
    weekBody: {
        flexGrow: 1,
        overflowY: 'auto',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '60px repeat(7, 1fr)',
    },
    timeLabels: {
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-color)',
        background: 'var(--bg-color)',
    },
    timeLabel: {
        height: '60px',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        position: 'relative',
    },
    timeLabelAfter: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '8px',
        borderTop: '1px solid var(--border-color)',
    },
    dayColumn: {
        display: 'flex',
        position: 'relative',
        borderRight: '1px solid var(--border-color)',
        backgroundSize: '100% 60px',
        backgroundImage:
            'linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)',
    },
    dayColumnLast: {
        borderRight: 'none',
    },
    eventBlock: {
        position: 'absolute',
        left: '4px',
        right: '4px',
        background: 'var(--event-bg)',
        color: 'var(--event-text)',
        borderRadius: '8px',
        padding: '6px',
        fontSize: '0.8rem',
        overflow: 'hidden',
        borderLeft: '4px solid var(--primary)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        flex: 0,
    },
    eventBlockCancelled: {
        background: 'var(--event-cancelled-bg)',
        color: 'var(--event-cancelled-text)',
        borderLeftColor: 'var(--event-cancelled-text)',
        textDecoration: 'line-through',
    },
    eventTitle: {
        fontWeight: 600,
        marginBottom: '2px',
    },
    eventTime: {
        fontSize: '0.7rem',
        opacity: 0.8,
    },
};
