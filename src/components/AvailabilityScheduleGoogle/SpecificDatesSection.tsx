import React from 'react';
import { SpecificDate } from './types';
import styles from './styles';
import { Ban } from '@/src/components/Icons';
import InputGoogle from '@/src/components/Input/InputGoogle/InputGoogle';
import WUII from '..';

interface SpecificDatesSectionProps {
    specificDates: SpecificDate[];
    onChange: (index: number, field: keyof SpecificDate, value: any) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    styling?: WUII['styling'];
}

export default function SpecificDatesSection({
    specificDates,
    onChange,
    onAdd,
    onRemove,
    styling,
}: SpecificDatesSectionProps): React.JSX.Element {
    return (
        <div style={styles.specificDatesContainer}>
            {specificDates.length === 0 ? (
                <div style={styles.noSpecificDates}>
                    No specific dates added yet.
                </div>
            ) : (
                specificDates.map((item, index) => {
                    return (
                        <div key={index} style={styles.slotRow}>
                            {/* Date Input */}
                            <div style={styles.dateInputWrapper}>
                                <InputGoogle
                                    type="date"
                                    value={item.date || ''}
                                    onChange={(e) =>
                                        onChange(index, 'date', e.target.value)
                                    }
                                    label="Date"
                                    description={`Specific date ${index + 1}`}
                                    aria-label={`Specific date ${index + 1}`}
                                    styling={styling}
                                />
                            </div>

                            {/* All Day Checkbox */}
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={!!item.allDay}
                                    onChange={(e) =>
                                        onChange(
                                            index,
                                            'allDay',
                                            e.target.checked
                                        )
                                    }
                                    style={styles.checkbox}
                                    aria-label={`Specific date ${index + 1} all day`}
                                />
                                All day
                            </label>

                            {/* Start Time Input */}
                            <div style={styles.timeInputWrapper}>
                                <InputGoogle
                                    value={item.startTime || ''}
                                    onChange={(e) =>
                                        onChange(
                                            index,
                                            'startTime',
                                            e.target.value
                                        )
                                    }
                                    label="Start"
                                    description="Start time"
                                    placeholder="9:00am"
                                    aria-label={`Specific date ${index + 1} start time`}
                                    disabled={item.allDay}
                                    styling={styling}
                                />
                            </div>

                            <span style={styles.separator}>-</span>

                            {/* End Time Input */}
                            <div style={styles.timeInputWrapper}>
                                <InputGoogle
                                    value={item.endTime || ''}
                                    onChange={(e) =>
                                        onChange(
                                            index,
                                            'endTime',
                                            e.target.value
                                        )
                                    }
                                    label="End"
                                    description="End time"
                                    placeholder="5:00pm"
                                    aria-label={`Specific date ${index + 1} end time`}
                                    disabled={item.allDay}
                                    styling={styling}
                                />
                            </div>

                            {/* Note Input */}
                            <div style={styles.specificNoteInputWrapper}>
                                <InputGoogle
                                    value={item.note || ''}
                                    onChange={(e) =>
                                        onChange(index, 'note', e.target.value)
                                    }
                                    label="Note"
                                    description="Add note"
                                    placeholder="Add note"
                                    aria-label={`Specific date ${index + 1} note`}
                                    styling={styling}
                                />
                            </div>

                            {/* Delete Button */}
                            <div style={styles.actionsGroup}>
                                <button
                                    onClick={() => onRemove(index)}
                                    style={styles.iconButton}
                                    title="Delete specific date"
                                >
                                    <Ban style={styles.iconStandard} />
                                </button>
                            </div>
                        </div>
                    );
                })
            )}

            <div>
                <button
                    onClick={onAdd}
                    style={{
                        ...styles.addSpecificDateButton,
                        borderColor: styling?.primaryColor,
                        color: styling?.primaryColor,
                    }}
                >
                    Add specific date
                </button>
            </div>
        </div>
    );
}
