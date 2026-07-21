import React from 'react';
import { motion } from 'framer-motion';
import { styles } from './styles';
import { IEvent, DAYS_OF_WEEK } from '../types';

interface WeekViewProps {
    currentDate: Date;
    events: IEvent[];
    onEventClick: (e: IEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
    currentDate,
    events,
    onEventClick,
}) => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(d.getDate() + i);
        return d;
    });

    const todayStr = new Date().toDateString();

    return (
        <motion.div
            style={styles.weekGrid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div style={styles.weekHeader}>
                <div style={styles.timeSpacer}></div>
                {weekDays.map((day, i) => (
                    <div
                        key={day.toString()}
                        style={{
                            ...styles.dayHeader,
                            ...(i === weekDays.length - 1
                                ? styles.dayHeaderLast
                                : {}),
                            ...(day.toDateString() === todayStr
                                ? styles.dayHeaderToday
                                : {}),
                        }}
                    >
                        <span style={styles.dayHeaderDayName}>
                            {DAYS_OF_WEEK[day.getDay()]}
                        </span>
                        <span style={styles.dayHeaderDayNum}>
                            {day.getDate()}
                        </span>
                    </div>
                ))}
            </div>
            <div style={styles.weekBody}>
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
                {weekDays.map((day, idx) => {
                    const dayEvents = events.filter(
                        (e) =>
                            new Date(e.dateTime).toDateString() ===
                            day.toDateString()
                    );

                    const eventsByTop: { [key: number]: IEvent[] } = {};
                    dayEvents.forEach((e) => {
                        const d = new Date(e.dateTime);
                        const top = (d.getHours() + d.getMinutes() / 60) * 60;
                        if (!eventsByTop[top]) eventsByTop[top] = [];
                        eventsByTop[top].push(e);
                    });

                    return (
                        <div
                            key={idx}
                            style={{
                                ...styles.dayColumn,
                                ...(idx === weekDays.length - 1
                                    ? styles.dayColumnLast
                                    : {}),
                            }}
                        >
                            {Object.entries(eventsByTop).flatMap(
                                ([topStr, timeEvents]) => {
                                    const top = parseFloat(topStr);
                                    const total = timeEvents.length;
                                    const displayCount = Math.min(total, 2);
                                    const hasMore = total > 2;

                                    return timeEvents
                                        .slice(0, displayCount)
                                        .map((e, evIdx) => {
                                            const width = `calc(${100 / displayCount}% - 8px)`;
                                            const left = `calc(${evIdx * (100 / displayCount)}% + 4px)`;
                                            const isLast =
                                                evIdx === displayCount - 1;

                                            return (
                                                <div
                                                    key={`${top}-${evIdx}`}
                                                    style={{
                                                        ...styles.eventBlock,
                                                        ...(e.status ===
                                                        'CANCELLED'
                                                            ? styles.eventBlockCancelled
                                                            : {}),
                                                        top: `${top}px`,
                                                        height: '50px',
                                                        width,
                                                        left,
                                                        right: 'auto',
                                                    }}
                                                    onClick={() =>
                                                        onEventClick(e)
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            ...(styles.eventTitle as any),
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                                whiteSpace:
                                                                    'nowrap',
                                                            }}
                                                        >
                                                            {e.name}
                                                        </span>
                                                        {isLast && hasMore && (
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        'bold',
                                                                    marginLeft:
                                                                        '4px',
                                                                }}
                                                            >
                                                                ...
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        });
                                }
                            )}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};
