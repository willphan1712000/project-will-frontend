export type IEvent<T = any> = {
    dateTime: string;
    staff: string;
    name: string;
    status: 'CONFIRM' | 'CANCELLED';
    data: T;
};

export type ViewMode = 'month' | 'week' | 'day';

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
