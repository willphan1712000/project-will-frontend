import React, { ChangeEvent } from 'react';
import { Ban, PlusCircle, Copy } from '@/src/components/Icons';
import { TimeSlot } from './types';
import styles from './styles';
import InputGoogle from '@/src/components/Input/InputGoogle/InputGoogle';
import WUII from '..';

interface SlotRowProps {
    slot: TimeSlot;
    slotIndex: number;
    dayIndex: number;
    onTimeChange: (
        dayIndex: number,
        slotIndex: number,
        field: keyof TimeSlot,
        e: ChangeEvent<HTMLInputElement>
    ) => void;
    onRemoveSlot: (dayIndex: number, slotIndex: number) => void;
    onAddSlot: (dayIndex: number) => void;
    onCopySlots: (dayIndex: number) => void;
    styling?: WUII['styling'];
    isAvailable?: boolean;
}

export default function SlotRow({
    slot,
    slotIndex,
    dayIndex,
    onTimeChange,
    onRemoveSlot,
    onAddSlot,
    onCopySlots,
    styling,
    isAvailable = true,
}: SlotRowProps): React.JSX.Element {
    return (
        <div style={styles.slotRow}>
            {!isAvailable && (
                <span
                    style={{
                        ...styles.unavailableText,
                    }}
                >
                    Unavailable
                </span>
            )}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexGrow: 1,
                    visibility: isAvailable ? 'visible' : 'hidden',
                }}
            >
                {/* All Day Checkbox */}
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={!!slot.allDay}
                        onChange={(e) =>
                            onTimeChange(dayIndex, slotIndex, 'allDay', e)
                        }
                        style={styles.checkbox}
                    />
                    All day
                </label>

                {/* Start Time Input */}
                <div style={styles.timeInputWrapper}>
                    <InputGoogle
                        value={slot.startTime || ''}
                        onChange={(e) =>
                            onTimeChange(dayIndex, slotIndex, 'startTime', e)
                        }
                        disabled={slot.allDay}
                        label="Start"
                        description="Start time"
                        aria-label={`Start time for slot ${slotIndex + 1}`}
                        styling={styling}
                    />
                </div>

                <span style={styles.separator}>-</span>

                {/* End Time Input */}
                <div style={styles.timeInputWrapper}>
                    <InputGoogle
                        value={slot.endTime || ''}
                        onChange={(e) =>
                            onTimeChange(dayIndex, slotIndex, 'endTime', e)
                        }
                        disabled={slot.allDay}
                        label="End"
                        description="End time"
                        aria-label={`End time for slot ${slotIndex + 1}`}
                        styling={styling}
                    />
                </div>

                {/* Break Time Input */}
                <div style={styles.timeInputWrapper}>
                    <InputGoogle
                        value={slot.breakTime || ''}
                        onChange={(e) =>
                            onTimeChange(dayIndex, slotIndex, 'breakTime', e)
                        }
                        placeholder="None"
                        label="Break"
                        description="Break duration in minute(s)"
                        aria-label={`Break duration for slot ${slotIndex + 1}`}
                        styling={styling}
                    />
                </div>

                {/* Note Input */}
                <div style={styles.noteInputWrapper}>
                    <InputGoogle
                        value={slot.note || ''}
                        onChange={(e) =>
                            onTimeChange(dayIndex, slotIndex, 'note', e)
                        }
                        placeholder="Add note"
                        label="Note"
                        description="Add note"
                        aria-label={`Note for slot ${slotIndex + 1}`}
                        styling={styling}
                    />
                </div>
            </div>

            {/* Action Icons */}
            <div style={styles.actionsGroup}>
                <button
                    onClick={() => onRemoveSlot(dayIndex, slotIndex)}
                    style={{
                        ...styles.iconButton,
                        visibility: isAvailable ? 'visible' : 'hidden',
                    }}
                    title="Clear slot"
                >
                    <Ban style={styles.iconStandard} />
                </button>
                <button
                    onClick={() => onAddSlot(dayIndex)}
                    style={{
                        ...styles.iconButton,
                        visibility:
                            isAvailable && slotIndex !== 0
                                ? 'hidden'
                                : 'visible',
                    }}
                    title="Add another slot"
                >
                    <PlusCircle style={styles.iconStandard} />
                </button>
                <button
                    onClick={() => onCopySlots(dayIndex)}
                    style={{
                        ...styles.iconButton,
                        visibility:
                            isAvailable && slotIndex === 0
                                ? 'visible'
                                : 'hidden',
                    }}
                    title="Copy time to all"
                >
                    <Copy style={styles.iconStandard} />
                </button>
            </div>
        </div>
    );
}
