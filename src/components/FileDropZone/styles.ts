import React from 'react';

type Name =
    | 'dropZone'
    | 'dragOver'
    | 'label'
    | 'hint'
    | 'fileInfo'
    | 'icon'
    | 'error'
    | 'info';

type Styles = {
    [K in Name]: React.CSSProperties;
};

const styles: Styles = {
    dropZone: {
        borderWidth: '2px',
        borderStyle: 'dashed',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        minHeight: '150px',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'visible',
    },
    dragOver: {
        opacity: 0.9,
    },
    label: {
        fontSize: '1.1rem',
        fontWeight: 500,
    },
    hint: {
        fontSize: '0.85rem',
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
    },
    fileInfo: {
        marginTop: '8px',
        padding: '8px 16px',
        background: 'var(--card, #fff)',
        border: '1px solid var(--border, transparent)',
        borderRadius: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        color: 'var(--primary, #1a73e8)',
    },
    icon: {
        width: '48px',
        height: '48px',
        opacity: 0.7,
    },
    error: {
        color: 'var(--destructive, #d93025)',
        fontSize: '0.8rem',
        marginTop: '4px',
    },
    info: {
        width: '20px',
        aspectRatio: 1,
    },
};

export default styles;
