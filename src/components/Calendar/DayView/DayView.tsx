import React from 'react';
import { motion } from 'framer-motion';
import { styles } from './styles';
import { IEvent, DAYS_OF_WEEK } from '../types';

interface DayViewProps {
    currentDate: Date;
    events: IEvent[];
    onEventClick: (e: IEvent) => void;
    staff?: string[];
}

export const DayView: React.FC<DayViewProps> = ({
    currentDate,
    events,
    onEventClick,
    staff = [],
}) => {
    const todayStr = new Date().toDateString();
    const isToday = currentDate.toDateString() === todayStr;
    const dayEvents = events.filter(
        (e) =>
            new Date(e.dateTime).toDateString() === currentDate.toDateString()
    );
    const hasStaff = staff.length > 0;

    return (
        <motion.div
            style={styles.dayGrid}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div style={styles.dayGridHeader}>
                <span style={styles.dayGridHeaderDayName}>
                    {DAYS_OF_WEEK[currentDate.getDay()]}
                </span>
                <span
                    style={{
                        ...styles.dayGridHeaderDayNum,
                        ...(isToday ? styles.dayHeaderToday : {}),
                    }}
                >
                    {currentDate.getDate()}
                </span>
            </div>
            {hasStaff && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `60px repeat(${staff.length}, 1fr)`,
                        borderBottom: '1px solid var(--border-color)',
                        background: 'var(--bg-color)',
                    }}
                >
                    <div style={styles.timeSpacer}></div>
                    {staff.map((s, idx) => (
                        <div
                            key={s}
                            style={{
                                textAlign: 'center',
                                padding: '12px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                color: 'var(--text-main)',
                                borderRight:
                                    idx < staff.length - 1
                                        ? '1px solid var(--border-color)'
                                        : 'none',
                            }}
                        >
                            {s}
                        </div>
                    ))}
                </div>
            )}
            <div
                style={{
                    ...styles.dayBody,
                    gridTemplateColumns: hasStaff
                        ? `60px repeat(${staff.length}, 1fr)`
                        : '60px 1fr',
                }}
            >
                <div style={styles.timeLabels}>
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} style={styles.timeLabel}>
                            {i === 0
                                ? '12 AM'
                                : i < 12
                                  ? `${i} AM`
                                  : i === 12
                                    ? '12 PM'
                                    : `${i - 12} PM`}
                            <div style={styles.timeLabelAfter} />
                        </div>
                    ))}
                </div>
                {hasStaff ? (
                    staff.map((s, idx) => (
                        <div
                            key={s}
                            style={{
                                ...styles.dayColumn,
                                borderRight:
                                    idx < staff.length - 1
                                        ? '1px solid var(--border-color)'
                                        : 'none',
                            }}
                        >
                            {dayEvents
                                .filter((e) => e.staff?.includes(s))
                                .map((e, evIdx) => {
                                    const d = new Date(e.dateTime);
                                    const top =
                                        (d.getHours() + d.getMinutes() / 60) *
                                        60;
                                    return (
                                        <div
                                            key={evIdx}
                                            style={{
                                                ...styles.eventBlock,
                                                ...(e.status === 'CANCELLED'
                                                    ? styles.eventBlockCancelled
                                                    : {}),
                                                top: `${top}px`,
                                                height: '50px',
                                            }}
                                            onClick={() => onEventClick(e)}
                                        >
                                            <div style={styles.eventTitle}>
                                                {e.name}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    ))
                ) : (
                    <div style={styles.dayColumn}>
                        {dayEvents.map((e, evIdx) => {
                            const d = new Date(e.dateTime);
                            const top =
                                (d.getHours() + d.getMinutes() / 60) * 60;
                            return (
                                <div
                                    key={evIdx}
                                    style={{
                                        ...styles.eventBlock,
                                        ...(e.status === 'CANCELLED'
                                            ? styles.eventBlockCancelled
                                            : {}),
                                        top: `${top}px`,
                                        height: '50px',
                                    }}
                                    onClick={() => onEventClick(e)}
                                >
                                    <div style={styles.eventTitle}>
                                        {e.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
