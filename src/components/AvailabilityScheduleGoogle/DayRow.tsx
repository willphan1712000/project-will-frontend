import React, { ChangeEvent } from 'react';
import { DayAvailability, TimeSlot } from './types';
import SlotRow from './SlotRow';
import styles from './styles';
import WUII from '..';

interface DayRowProps {
    dayData: DayAvailability;
    dayIndex: number;
    onAddSlot: (dayIndex: number) => void;
    onRemoveSlot: (dayIndex: number, slotIndex: number) => void;
    onTimeChange: (
        dayIndex: number,
        slotIndex: number,
        field: keyof TimeSlot,
        e: ChangeEvent<HTMLInputElement>
    ) => void;
    onCopySlots: (dayIndex: number) => void;
    styling?: WUII['styling'];
}

export default function DayRow({
    dayData,
    dayIndex,
    onAddSlot,
    onRemoveSlot,
    onTimeChange,
    onCopySlots,
    styling,
}: DayRowProps): React.JSX.Element {
    return (
        <div style={styles.dayRow}>
            {/* Day Label */}
            <div style={styles.dayLabel}>{dayData.day}</div>

            {/* Time Slots or Unavailable State */}
            {!dayData.isAvailable ? (
                <SlotRow
                    slot={{
                        startTime: '',
                        endTime: '',
                        breakTime: '',
                        note: '',
                    }}
                    slotIndex={0}
                    dayIndex={dayIndex}
                    onTimeChange={onTimeChange}
                    onRemoveSlot={onRemoveSlot}
                    onAddSlot={onAddSlot}
                    onCopySlots={onCopySlots}
                    styling={styling}
                    isAvailable={dayData.isAvailable}
                />
            ) : (
                <div style={styles.slotList}>
                    {dayData.slots.map((slot, slotIndex) => (
                        <SlotRow
                            key={slotIndex}
                            slot={slot}
                            slotIndex={slotIndex}
                            dayIndex={dayIndex}
                            onTimeChange={onTimeChange}
                            onRemoveSlot={onRemoveSlot}
                            onAddSlot={onAddSlot}
                            onCopySlots={onCopySlots}
                            styling={styling}
                            isAvailable={dayData.isAvailable}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
