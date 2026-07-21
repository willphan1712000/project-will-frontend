import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { styles } from './styles';
import { IEvent, ViewMode } from './types';
import { CalendarHeader } from './CalendarHeader/CalendarHeader';
import { MonthView } from './MonthView/MonthView';
import { WeekView } from './WeekView/WeekView';
import { DayView } from './DayView/DayView';

export type { IEvent, ViewMode } from './types';

export interface CalendarProps<T = any> {
    initialEvents?: IEvent<T>[];
    PopupComponent?: React.ElementType<{
        event: IEvent<T>;
        onClose: () => void;
    }>;
    staff?: string[];
    options: {
        themeColor?: string;
        backgroundColor?: string;
        textColor?: string;
    };
}
/**
 * A highly interactive, premium Calendar component with Day, Week, and Month views.
 *
 * It supports passing an array of events via the `initialEvents` prop.
 * Events can display their title and dynamically adjust their styles based on their status (e.g., 'CANCELLED').
 * When an event is clicked, the calendar displays a popup which is customizable. You can define the popup
 * globally via the `PopupComponent` prop, or override it locally per-event within the event data.
 *
 * The calendar also supports customizing its theme, allowing you to configure the `themeColor`, `backgroundColor`,
 * and `textColor` via the `options` prop to match your application's design system.
 *
 *
 * @template T - The type of the custom data payload attached to each event.
 * @param {CalendarProps<T>} props - The props for the Calendar component.
 * @param {IEvent<T>[]} [props.initialEvents=[]] - Initial array of events to render on mount.
 * @param {React.ElementType} [props.PopupComponent] - Global custom popup component rendered when an event is clicked.
 * @param {string[]} [props.staff=[]] - Array of staff strings to render as horizontal columns in the Day view.
 * @param {Object} props.options - Theme configuration options for the calendar.
 * @param {string} [props.options.themeColor='purple'] - The primary theme color used for borders, buttons, and event styling.
 * @param {string} [props.options.backgroundColor='#fff'] - The main background color of the calendar container.
 * @param {string} [props.options.textColor='#000'] - The primary text color used throughout the calendar.
 */
function Calendar<T = any>({
    initialEvents = [],
    PopupComponent,
    staff = [],
    options = {
        backgroundColor: '#fff',
        textColor: '#000',
        themeColor: 'purple',
    },
}: CalendarProps<T>) {
    const { backgroundColor, textColor: color, themeColor } = options;

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [selectedEvent, setSelectedEvent] = useState<IEvent<T> | null>(null);

    const handleEventClick = (event: IEvent<T>) => {
        setSelectedEvent(event);
    };

    const goToday = () => setCurrentDate(new Date());

    const navPrev = () => {
        const newDate = new Date(currentDate);
        if (viewMode === 'month') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else if (viewMode === 'week') {
            newDate.setDate(newDate.getDate() - 7);
        } else {
            newDate.setDate(newDate.getDate() - 1);
        }
        setCurrentDate(newDate);
    };

    const navNext = () => {
        const newDate = new Date(currentDate);
        if (viewMode === 'month') {
            newDate.setMonth(newDate.getMonth() + 1);
        } else if (viewMode === 'week') {
            newDate.setDate(newDate.getDate() + 7);
        } else {
            newDate.setDate(newDate.getDate() + 1);
        }
        setCurrentDate(newDate);
    };

    const containerStyle = {
        ...styles.calendarContainer,
        ...({
            '--primary': themeColor,
            '--event-text': themeColor,
            '--event-bg': `color-mix(in srgb, ${themeColor} 15%, transparent)`,
            '--bg-color': backgroundColor,
            '--text-main': color,
        } as any),
    };

    return (
        <div style={{ ...containerStyle }}>
            <CalendarHeader
                currentDate={currentDate}
                viewMode={viewMode}
                setViewMode={setViewMode}
                goToday={goToday}
                navPrev={navPrev}
                navNext={navNext}
            />

            <div style={styles.gridContainer}>
                <AnimatePresence mode="wait">
                    {viewMode === 'month' && (
                        <React.Fragment key="month">
                            <MonthView
                                currentDate={currentDate}
                                events={initialEvents}
                                setCurrentDate={setCurrentDate}
                                setViewMode={setViewMode}
                                onEventClick={handleEventClick}
                            />
                        </React.Fragment>
                    )}
                    {viewMode === 'week' && (
                        <React.Fragment key="week">
                            <WeekView
                                currentDate={currentDate}
                                events={initialEvents}
                                onEventClick={handleEventClick}
                            />
                        </React.Fragment>
                    )}
                    {viewMode === 'day' && (
                        <React.Fragment key="day">
                            <DayView
                                currentDate={currentDate}
                                events={initialEvents}
                                onEventClick={handleEventClick}
                                staff={staff}
                            />
                        </React.Fragment>
                    )}
                </AnimatePresence>
            </div>

            {selectedEvent &&
                (PopupComponent
                    ? React.createElement(PopupComponent, {
                          event: selectedEvent,
                          onClose: () => setSelectedEvent(null),
                      })
                    : (selectedEvent as any).PopupComponent
                      ? React.createElement(
                            (selectedEvent as any).PopupComponent,
                            {
                                event: selectedEvent,
                                onClose: () => setSelectedEvent(null),
                            }
                        )
                      : null)}
        </div>
    );
}

export default Calendar;
