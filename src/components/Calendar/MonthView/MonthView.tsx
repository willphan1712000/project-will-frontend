import React from 'react';
import { motion } from 'framer-motion';
import { styles } from './styles';
import { IEvent, DAYS_OF_WEEK } from '../types';

interface MonthViewProps {
    currentDate: Date;
    events: IEvent[];
    setCurrentDate: (d: Date) => void;
    setViewMode: (v: 'day') => void;
    onEventClick: (e: IEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
    currentDate,
    events,
    setCurrentDate,
    setViewMode,
    onEventClick,
}) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const grid = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        grid.push({
            date: new Date(year, month - 1, daysInPrevMonth - i),
            isCurrentMonth: false,
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        grid.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - grid.length;
    for (let i = 1; i <= remainingDays; i++) {
        grid.push({
            date: new Date(year, month + 1, i),
            isCurrentMonth: false,
        });
    }

    const todayStr = new Date().toDateString();

    return (
        <motion.div
            style={styles.monthGrid}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {DAYS_OF_WEEK.map((day) => (
                <div key={day} style={styles.dayName}>
                    {day}
                </div>
            ))}

            {grid.map((cell, idx) => {
                const isToday = cell.date.toDateString() === todayStr;

                const dayEvents = events.filter((e) => {
                    const ed = new Date(e.dateTime);
                    return ed.toDateString() === cell.date.toDateString();
                });

                return (
                    <motion.div
                        key={idx}
                        style={{
                            ...styles.monthCell,
                            ...(!cell.isCurrentMonth
                                ? styles.monthCellInactive
                                : {}),
                            ...(isToday ? styles.monthCellToday : {}),
                        }}
                        whileHover={{
                            zIndex: 2,
                            border: '1px solid var(--primary)',
                        }}
                        onClick={() => {
                            setCurrentDate(cell.date);
                            setViewMode('day');
                        }}
                    >
                        <span
                            style={{
                                ...styles.dateNum,
                                ...(isToday ? styles.dateNumToday : {}),
                            }}
                        >
                            {cell.date.getDate()}
                        </span>
                        <div style={styles.eventsList}>
                            {dayEvents.slice(0, 3).map((e, evIdx) => (
                                <div
                                    key={evIdx}
                                    style={{
                                        ...styles.eventBadge,
                                        ...(e.status === 'CANCELLED'
                                            ? styles.eventBadgeCancelled
                                            : {}),
                                    }}
                                    onClick={(ev) => {
                                        ev.stopPropagation();
                                        onEventClick(e);
                                    }}
                                >
                                    {e.name}
                                </div>
                            ))}
                            {dayEvents.length > 3 && (
                                <div
                                    style={{
                                        ...styles.eventBadge,
                                        background: 'transparent',
                                        color: 'var(--text-muted)',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    +{dayEvents.length - 3} more
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};
