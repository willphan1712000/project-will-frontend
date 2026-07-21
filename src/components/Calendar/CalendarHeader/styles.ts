import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties | any } = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
    },
    navGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    headerH2: {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: 700,
        minWidth: '200px',
    },
    btn: {
        background: 'var(--surface)',
        border: '1px solid var(--glass-border)',
        color: 'var(--text-main)',
        padding: '8px 16px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
    },
    btnPrimary: {
        background: 'var(--primary)',
        color: 'white',
        borderColor: 'var(--primary)',
    },
    iconBtn: {
        padding: '8px',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
    },
    viewTabs: {
        display: 'flex',
        background: 'var(--surface)',
        borderRadius: '12px',
        padding: '4px',
        border: '1px solid var(--glass-border)',
    },
    viewTabsButton: {
        background: 'transparent',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '8px',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        fontWeight: 600,
    },
    viewTabsButtonActive: {
        background: 'var(--bg-color)',
        color: 'var(--text-main)',
        border: '2px solid var(--primary)',
    },
};
