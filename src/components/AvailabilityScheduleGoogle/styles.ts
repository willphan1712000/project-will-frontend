import { CSSProperties } from 'react';

export const container: CSSProperties = {
    width: '1200px',
    maxWidth: '1500px',
};

export const topControls: CSSProperties = {
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
};

export const repeatButton: CSSProperties = {
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

export const repeatSelect: CSSProperties = {
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
};

export const repeatButtonHover: CSSProperties = {
    ...repeatButton,
    backgroundColor: '#e5e7eb',
};

export const iconSmall: CSSProperties = {
    width: '1rem',
    height: '1rem',
    color: '#4b5563',
};

export const iconStandard: CSSProperties = {
    width: '1.25rem',
    height: '1.25rem',
};

export const scheduleList: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
};

export const dayRow: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
};

export const dayLabel: CSSProperties = {
    width: '4rem',
    fontWeight: 500,
    color: '#4b5563',
};

export const contentArea: CSSProperties = {
    flex: 1,
};

export const unavailableRow: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0.5rem',
    gap: '0.75rem',
    color: '#6b7280',
};

export const unavailableText: CSSProperties = {
    width: '40rem',
    flex: 'none',
    color: '#6b7280',
};

export const timeInputsContainer: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '40rem',
    flexShrink: 0,
};

export const iconButton: CSSProperties = {
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

export const iconButtonHover: CSSProperties = {
    ...iconButton,
    backgroundColor: '#e5e7eb',
};

export const slotList: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
};

export const slotRow: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
};

export const timeInput: CSSProperties = {
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

export const timeInputHover: CSSProperties = {
    ...timeInput,
    backgroundColor: '#e4e6e9',
};

export const timeInputFocus: CSSProperties = {
    ...timeInput,
    backgroundColor: '#ffffff',
    borderColor: '#3b82f6',
};

export const timeInputInvalid: CSSProperties = {
    ...timeInput,
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
};

export const timeInputInvalidHover: CSSProperties = {
    ...timeInputHover,
    borderColor: '#dc2626',
    backgroundColor: '#fee2e2',
};

export const timeInputInvalidFocus: CSSProperties = {
    ...timeInputFocus,
    borderColor: '#ef4444',
    boxShadow: '0 0 0 2px #fca5a5',
};

export const separator: CSSProperties = {
    color: '#9ca3af',
};

export const actionsGroup: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    marginLeft: '0.5rem',
};

export const footer: CSSProperties = {
    marginTop: '2rem',
    borderRadius: '0.5rem',
    padding: '1rem',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
};

export const footerLabel: CSSProperties = {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
};

export const footerValue: CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#374151',
};

export const timezoneSelect: CSSProperties = {
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

export const timezoneSelectHover: CSSProperties = {
    ...timezoneSelect,
    backgroundColor: '#e4e6e9',
};

export const timezoneSelectFocus: CSSProperties = {
    ...timezoneSelect,
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 2px #3b82f6',
};

export const timeInputDisabled: CSSProperties = {
    ...timeInput,
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
    borderColor: '#e5e7eb',
    cursor: 'not-allowed',
};

export const checkboxLabel: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    fontSize: '0.875rem',
    color: '#4b5563',
    cursor: 'pointer',
    userSelect: 'none',
};

export const checkbox: CSSProperties = {
    width: '1rem',
    height: '1rem',
    cursor: 'pointer',
};

export const dateInput: CSSProperties = {
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
};

export const addSpecificDateButton: CSSProperties = {
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
};

export const timeInputWrapper: CSSProperties = {
    width: '5rem',
};

export const noteInputWrapper: CSSProperties = {
    width: '10rem',
};

export const dateInputWrapper: CSSProperties = {
    width: '10.5rem',
};

export const specificNoteInputWrapper: CSSProperties = {
    width: '12rem',
};

export const timezoneSelectWrapper: CSSProperties = {
    width: '20rem',
};

export const toggleContainer: CSSProperties = {
    display: 'inline-flex',
    backgroundColor: '#ffffff',
    borderRadius: '9999px',
    padding: '5px',
    border: '1px solid #e5e7eb',
    alignItems: 'center',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

export const tabButtonBase: CSSProperties = {
    padding: '8px 20px',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    outline: 'none',
    userSelect: 'none',
};

export const specificDatesContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
};

export const noSpecificDates: CSSProperties = {
    color: '#9ca3af',
    fontStyle: 'italic',
    padding: '1rem 0',
};

export const actionsSpacer: CSSProperties = {
    width: '2rem',
};

export const repeatUntilWrapper: CSSProperties = {
    width: '12rem',
};
