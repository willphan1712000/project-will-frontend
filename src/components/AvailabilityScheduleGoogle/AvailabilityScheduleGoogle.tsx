import React, { ChangeEvent, JSX, useState } from 'react';
import DayRow from './DayRow';
import styles from './styles';
import TimezoneFooter from './TimezoneFooter';
import { ScheduleData, TimeSlot, SpecificDate } from './types';
import SpecificDatesSection from './SpecificDatesSection';
import Tabs from './Tabs';
import InputGoogle from '@/src/components/Input/InputGoogle/InputGoogle';
import WUII from '..';

/**
 * AvailabilityScheduleGoogle Component
 *
 * A Google Calendar/Appointments style scheduling component that allows users
 * to define their weekly availability and custom specific dates availability.
 *
 * UTC Time Zone
 * @link https://upload.wikimedia.org/wikipedia/commons/c/c1/Time_zones_of_the_world-UTC.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original
 *
 * ### Data Interface
 * - `value` (ScheduleData): Object containing scheduling states:
 *   - `timezone` (string): Active timezone identifier (e.g., "America/New_York").
 *   - `schedule` (DayAvailability[]): Weekly schedule mapping days of week to lists of TimeSlot availability.
 *   - `specificDate` (SpecificDate[]): Specific date overrides list.
 *   - `repeatUntil` (string): Repeat until date string (e.g. "2026-08-31").
 * - `setValue`: Value state dispatcher function of type `(value?: ScheduleData) => void`.
 *
 * ### Component Types
 * - `TimeSlot`: `{ startTime: string, endTime: string, breakTime: string, note: string, allDay?: boolean }`
 * - `DayAvailability`: `{ day: string, isAvailable: boolean, slots: TimeSlot[] }`
 * - `SpecificDate`: `{ date: string, startTime: string, endTime: string, note: string, allDay?: boolean }`
 *
 * ### How to Use
 * 1. Initialize `scheduleData` state in the parent component using a default dataset.
 * 2. Import and render `AvailabilityScheduleGoogle` passing the state and its state-setter function.
 *
 * @example
 * ```tsx
 * import React, { useState } from 'react';
 * import AvailabilityScheduleGoogle from './AvailabilityScheduleGoogle';
 * import { ScheduleData } from './types';
 *
 * function ParentComponent() {
 *   const [schedule, setSchedule] = useState<ScheduleData>({
 *     timezone: 'America/New_York',
 *     schedule: DEFAULT_SCHEDULE,
 *     specificDate: [],
 *     repeatUntil: '',
 *   });
 *
 *   return (
 *     <AvailabilityScheduleGoogle
 *       value={schedule}
 *       setValue={setSchedule}
 *     />
 *   );
 * }
 * ```
 */
export default function AvailabilityScheduleGoogle({
    value,
    setValue,
    styling,
}: WUII<ScheduleData>): JSX.Element | null {
    const [activeTab, setActiveTab] = useState<'weekly' | 'specific'>('weekly');

    if (!value || !setValue) {
        return null;
    }

    const handleAddSlot = (dayIndex: number): void => {
        const newSchedule = value.schedule.map((dayData, index) => {
            if (index === dayIndex) {
                return {
                    ...dayData,
                    isAvailable: true,
                    slots: [
                        ...dayData.slots,
                        {
                            startTime: '9:00am',
                            endTime: '5:00pm',
                            breakTime: '15',
                            note: '',
                            allDay: false,
                        },
                    ],
                };
            }
            return dayData;
        });
        setValue({ ...value, schedule: newSchedule });
    };

    const handleRemoveSlot = (dayIndex: number, slotIndex: number): void => {
        const newSchedule = value.schedule.map((dayData, index) => {
            if (index === dayIndex) {
                const updatedSlots = dayData.slots.filter(
                    (_, sIndex) => sIndex !== slotIndex
                );
                return {
                    ...dayData,
                    isAvailable: updatedSlots.length > 0,
                    slots: updatedSlots,
                };
            }
            return dayData;
        });
        setValue({ ...value, schedule: newSchedule });
    };

    const handleTimeChange = (
        dayIndex: number,
        slotIndex: number,
        field: keyof TimeSlot,
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        const val =
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const newSchedule = value.schedule.map((dayData, index) => {
            if (index === dayIndex) {
                const updatedSlots = dayData.slots.map((slot, sIndex) => {
                    if (sIndex === slotIndex) {
                        return {
                            ...slot,
                            [field]: val,
                        };
                    }
                    return slot;
                });
                return {
                    ...dayData,
                    slots: updatedSlots,
                };
            }
            return dayData;
        });
        setValue({ ...value, schedule: newSchedule });
    };

    const handleCopySlots = (dayIndex: number): void => {
        const sourceSlots = value.schedule[dayIndex].slots;
        const newSchedule = value.schedule.map((dayData, index) => {
            if (index !== dayIndex && dayData.isAvailable) {
                return {
                    ...dayData,
                    slots: sourceSlots.map((slot) => ({ ...slot })),
                };
            }
            return dayData;
        });
        setValue({ ...value, schedule: newSchedule });
    };

    const handleTimezoneChange = (newTimezone?: string): void => {
        if (!newTimezone) return;
        setValue({
            ...value,
            timezone: newTimezone,
        });
    };

    const handleAddSpecificDate = (): void => {
        setValue({
            ...value,
            specificDate: [
                ...(value.specificDate || []),
                {
                    date: '',
                    startTime: '9:00am',
                    endTime: '5:00pm',
                    note: '',
                    allDay: false,
                },
            ],
        });
    };

    const handleRemoveSpecificDate = (indexToRemove: number): void => {
        setValue({
            ...value,
            specificDate: (value.specificDate || []).filter(
                (_, idx) => idx !== indexToRemove
            ),
        });
    };

    const handleSpecificDateChange = (
        indexToUpdate: number,
        field: keyof SpecificDate,
        val: any
    ): void => {
        const newSpecificDates = (value.specificDate || []).map((item, idx) => {
            if (idx === indexToUpdate) {
                return {
                    ...item,
                    [field]: val,
                };
            }
            return item;
        });
        setValue({
            ...value,
            specificDate: newSpecificDates,
        });
    };

    return (
        <div style={styles.container}>
            {/* Top Controls */}
            <div style={styles.topControls}>
                <Tabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    styling={styling}
                />
            </div>

            {/* Schedule List or Specific Dates Section */}
            {activeTab === 'weekly' ? (
                <div style={styles.scheduleList}>
                    <div style={styles.repeatUntilWrapper}>
                        <InputGoogle
                            type="date"
                            value={value.repeatUntil || ''}
                            onChange={(e) =>
                                setValue({
                                    ...value,
                                    repeatUntil: e.target.value,
                                })
                            }
                            label="Repeat until"
                            description="End date of schedule repetition"
                            aria-label="Repeat until"
                            styling={styling}
                        />
                    </div>
                    {value.schedule.map((dayData, dayIndex) => (
                        <DayRow
                            key={dayData.day}
                            dayData={dayData}
                            dayIndex={dayIndex}
                            onAddSlot={handleAddSlot}
                            onRemoveSlot={handleRemoveSlot}
                            onTimeChange={handleTimeChange}
                            onCopySlots={handleCopySlots}
                            styling={styling}
                        />
                    ))}
                </div>
            ) : (
                <SpecificDatesSection
                    specificDates={value.specificDate || []}
                    onAdd={handleAddSpecificDate}
                    onRemove={handleRemoveSpecificDate}
                    onChange={handleSpecificDateChange}
                    styling={styling}
                />
            )}

            {/* Timezone Footer */}
            <TimezoneFooter
                timezone={value.timezone}
                onTimezoneChange={handleTimezoneChange}
                styling={styling}
            />
        </div>
    );
}
