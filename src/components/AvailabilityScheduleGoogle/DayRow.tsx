import React, { ChangeEvent } from 'react';
import { PlusCircle } from '@/src/components/Icons';
import { DayAvailability, TimeSlot } from './types';
import SlotRow from './SlotRow';
import * as styles from './styles';
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
            <div style={styles.contentArea}>
                {!dayData.isAvailable ? (
                    <div style={styles.unavailableRow}>
                        <div style={styles.timeInputsContainer}>
                            <span style={styles.unavailableText}>
                                Unavailable
                            </span>
                        </div>
                        <div style={styles.actionsGroup}>
                            <div style={styles.actionsSpacer} />
                            <button
                                onClick={() => onAddSlot(dayIndex)}
                                style={styles.iconButton}
                                aria-label={`Add slot for ${dayData.day}`}
                            >
                                <PlusCircle style={styles.iconStandard} />
                            </button>
                        </div>
                    </div>
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
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
