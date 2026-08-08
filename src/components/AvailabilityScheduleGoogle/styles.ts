import React from 'react';

type Name =
    | 'container'
    | 'topControls'
    | 'repeatButton'
    | 'repeatSelect'
    | 'repeatButtonHover'
    | 'iconSmall'
    | 'iconStandard'
    | 'scheduleList'
    | 'dayRow'
    | 'dayLabel'
    | 'unavailableRow'
    | 'unavailableText'
    | 'iconButton'
    | 'iconButtonHover'
    | 'slotRow'
    | 'timeInputHover'
    | 'timeInputFocus'
    | 'timeInputInvalid'
    | 'timeInputInvalidHover'
    | 'timeInputInvalidFocus'
    | 'separator'
    | 'actionsGroup'
    | 'footer'
    | 'footerValue'
    | 'timezoneSelect'
    | 'timezoneSelectHover'
    | 'timezoneSelectFocus'
    | 'timeInputDisabled'
    | 'checkboxLabel'
    | 'checkbox'
    | 'dateInput'
    | 'addSpecificDateButton'
    | 'timeInputWrapper'
    | 'noteInputWrapper'
    | 'dateInputWrapper'
    | 'specificNoteInputWrapper'
    | 'timezoneSelectWrapper'
    | 'toggleContainer'
    | 'tabButtonBase'
    | 'specificDatesContainer'
    | 'noSpecificDates'
    | 'actionsSpacer'
    | 'repeatUntilWrapper';

type Styles = {
    [K in Name]: React.CSSProperties;
};

const repeatButton: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#f3f4f6',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    color: 'inherit',
    fontSize: '1rem',
};

const iconButton: React.CSSProperties = {
    padding: '0.375rem',
    borderRadius: '9999px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
};

const timeInput: React.CSSProperties = {
    width: '4rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#f0f2f5',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: '0.375rem',
    transition: 'all 0.2s',
    outline: 'none',
    color: 'inherit',
    fontSize: '1rem',
};

const timezoneSelect: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#374151',
    cursor: 'pointer',
    outline: 'none',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
    marginLeft: '-0.5rem',
};

const styles: Styles = {
    container: {
        width: '100%',
    },
    topControls: {
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    repeatButton,
    repeatSelect: {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        padding: '0.5rem 1.5rem 0.5rem 1rem',
        borderRadius: '0.375rem',
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        color: '#374151',
        fontSize: '1rem',
        outline: 'none',
        fontFamily: 'inherit',
    },
    repeatButtonHover: {
        ...repeatButton,
        backgroundColor: '#e5e7eb',
    },
    iconSmall: {
        width: '1rem',
        height: '1rem',
        color: '#4b5563',
    },
    iconStandard: {
        width: '1.25rem',
        height: '1.25rem',
    },
    scheduleList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    dayRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    dayLabel: {
        width: '100px',
        fontWeight: 500,
        color: '#4b5563',
        textAlign: 'left',
    },
    unavailableRow: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '0.5rem',
        gap: '0.75rem',
        color: '#6b7280',
        justifyContent: 'center',
    },
    unavailableText: {
        color: '#6b7280',
    },
    iconButton,
    iconButtonHover: {
        ...iconButton,
        backgroundColor: '#e5e7eb',
    },
    slotRow: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        gap: '0.25rem',
    },
    timeInputHover: {
        ...timeInput,
        backgroundColor: '#e4e6e9',
    },
    timeInputFocus: {
        ...timeInput,
        backgroundColor: '#ffffff',
        borderColor: '#3b82f6',
    },
    timeInputInvalid: {
        ...timeInput,
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
    },
    timeInputInvalidHover: {
        ...timeInput,
        borderColor: '#dc2626',
        backgroundColor: '#fee2e2',
    },
    timeInputInvalidFocus: {
        ...timeInput,
        borderColor: '#ef4444',
        boxShadow: '0 0 0 2px #fca5a5',
    },
    separator: {
        color: '#9ca3af',
    },
    actionsGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    },
    footer: {
        marginTop: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    footerValue: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: '#374151',
    },
    timezoneSelect,
    timezoneSelectHover: {
        ...timezoneSelect,
        backgroundColor: '#e4e6e9',
    },
    timezoneSelectFocus: {
        ...timezoneSelect,
        backgroundColor: '#ffffff',
        boxShadow: '0 0 0 2px #3b82f6',
    },
    timeInputDisabled: {
        ...timeInput,
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        borderColor: '#e5e7eb',
        cursor: 'not-allowed',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.875rem',
        color: '#4b5563',
        cursor: 'pointer',
        userSelect: 'none',
    },
    checkbox: {
        width: '1rem',
        height: '1rem',
        cursor: 'pointer',
    },
    dateInput: {
        width: '9.5rem',
        padding: '0.5rem 0.75rem',
        backgroundColor: '#f0f2f5',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderRadius: '0.375rem',
        outline: 'none',
        color: 'inherit',
        fontSize: '1rem',
        fontFamily: 'inherit',
    },
    addSpecificDateButton: {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#2563eb',
        borderRadius: '0.375rem',
        padding: '0.5rem 1rem',
        color: '#2563eb',
        fontWeight: 500,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
        marginTop: '1rem',
    },
    timeInputWrapper: {
        width: '100px',
    },
    noteInputWrapper: {
        flexGrow: 1,
    },
    dateInputWrapper: {
        width: '200px',
    },
    specificNoteInputWrapper: {
        flexGrow: 1,
    },
    timezoneSelectWrapper: {
        width: '50%',
        minWidth: '250px',
    },
    toggleContainer: {
        display: 'inline-flex',
        backgroundColor: '#ffffff',
        borderRadius: '9999px',
        padding: '5px',
        border: '1px solid #e5e7eb',
        alignItems: 'center',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    tabButtonBase: {
        padding: '8px 20px',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: 'none',
        outline: 'none',
        userSelect: 'none',
    },
    specificDatesContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flexGrow: 1,
    },
    noSpecificDates: {
        color: '#9ca3af',
        fontStyle: 'italic',
        padding: '1rem 0',
    },
    actionsSpacer: {
        width: '2rem',
    },
    repeatUntilWrapper: {
        width: '12rem',
    },
};

export default styles;
