import React from 'react';
import { motion } from 'framer-motion';
import { styles } from './styles';
import { ViewMode, MONTHS } from '../types';

const ChevronLeft = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRight = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 18l6-6-6-6" />
    </svg>
);

interface CalendarHeaderProps {
    currentDate: Date;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    goToday: () => void;
    navPrev: () => void;
    navNext: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    currentDate,
    viewMode,
    setViewMode,
    goToday,
    navPrev,
    navNext,
}) => {
    const formatHeaderTitle = () => {
        if (viewMode === 'month') {
            return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        } else if (viewMode === 'week') {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
                return `${MONTHS[startOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`;
            } else {
                return `${MONTHS[startOfWeek.getMonth()]} - ${MONTHS[endOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`;
            }
        } else {
            return `${MONTHS[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.navGroup}>
                <motion.button
                    style={styles.btn}
                    whileHover={{ background: 'var(--border-color)', y: -1 }}
                    whileTap={{ y: 1 }}
                    onClick={goToday}
                >
                    Today
                </motion.button>
                <motion.button
                    style={{ ...styles.btn, ...styles.iconBtn }}
                    whileHover={{ background: 'var(--border-color)', y: -1 }}
                    whileTap={{ y: 1 }}
                    onClick={navPrev}
                >
                    <ChevronLeft />
                </motion.button>
                <motion.button
                    style={{ ...styles.btn, ...styles.iconBtn }}
                    whileHover={{ background: 'var(--border-color)', y: -1 }}
                    whileTap={{ y: 1 }}
                    onClick={navNext}
                >
                    <ChevronRight />
                </motion.button>
                <h2 style={styles.headerH2}>{formatHeaderTitle()}</h2>
            </div>

            <div style={styles.viewTabs}>
                <motion.button
                    style={{
                        ...styles.viewTabsButton,
                        ...(viewMode === 'month'
                            ? styles.viewTabsButtonActive
                            : {}),
                    }}
                    onClick={() => setViewMode('month')}
                >
                    Month
                </motion.button>
                <motion.button
                    style={{
                        ...styles.viewTabsButton,
                        ...(viewMode === 'week'
                            ? styles.viewTabsButtonActive
                            : {}),
                    }}
                    onClick={() => setViewMode('week')}
                >
                    Week
                </motion.button>
                <motion.button
                    style={{
                        ...styles.viewTabsButton,
                        ...(viewMode === 'day'
                            ? styles.viewTabsButtonActive
                            : {}),
                    }}
                    onClick={() => setViewMode('day')}
                >
                    Day
                </motion.button>
            </div>
        </header>
    );
};
