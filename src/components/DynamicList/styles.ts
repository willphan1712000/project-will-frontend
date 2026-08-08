import React from 'react';

type Element =
    | 'container'
    | 'listWrapper'
    | 'item'
    | 'itemDragged'
    | 'dragHandle'
    | 'input'
    | 'deleteButton'
    | 'addButton'
    | 'buttonGroup'
    | 'info';

type DragStyles = {
    [K in Element]: React.CSSProperties;
};

export const styles: DragStyles = {
    container: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    listWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1rem',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        backgroundColor: '#ffffff',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        borderRadius: '0.5rem',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '50px',
        boxSizing: 'border-box',
    },
    itemDragged: {
        opacity: 0.4,
        borderStyle: 'dashed',
        borderColor: '#3b82f6',
        backgroundColor: '#eff6ff',
    },
    dragHandle: {
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        color: '#9ca3af',
        transition: 'color 0.15s ease',
    },
    input: {
        flex: 1,
        fontSize: '0.875rem',
        color: '#1f2937',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        padding: '0.25rem 0',
        fontFamily: 'inherit',
    },
    deleteButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af',
        padding: '0.375rem',
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1.25rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#374151',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '5px',
        alignSelf: 'flex-start',
    },
    info: {
        width: '20px',
        aspectRatio: 1,
    },
};
