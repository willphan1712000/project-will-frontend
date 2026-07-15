import React, { useState } from 'react';
import { styles } from './styles';
import { GripVertical, TrashCan } from '../Icons';
import Info from '@/src/components/Info/Info';

interface Props {
    values: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    isReadOnly?: boolean;
    label?: string;
    description?: string;
    options?: {
        backgroundColor?: string;
        borderColor?: string;
        textColor?: string;
    };
}

/**
 * A dynamic, interactive list component that allows users to add, remove,
 * edit, and reorder (via drag-and-drop) a list of text inputs.
 * Supports read-only mode, custom labelling, and hover descriptions.
 *
 * @param values array of values in the list
 * @param onChange callback to update values
 * @param isReadOnly if true, disables adding, deleting, and dragging items
 * @param label label used for the button and placeholders (defaults to 'value')
 * @param description description text for the info tooltip
 * @param options configuration for background, border and text colors
 *
 * @example
 * ```tsx
 * const [values, setValues] = useState(['Option 1', 'Option 2']);
 * <DynamicList
 *   values={values}
 *   onChange={setValues}
 *   isReadOnly={false}
 *   label="option"
 *   description="List of options"
 *   options={{
 *     backgroundColor: '#ffffff',
 *     borderColor: '#e2e8f0',
 *     textColor: '#1a202c'
 *   }}
 * />
 * ```
 */
const DynamicList = ({
    values,
    onChange,
    isReadOnly = false,
    label = 'value',
    description = '',
    options = {
        backgroundColor: '#fff',
        borderColor: '#f0f0f0',
        textColor: '#000',
    },
}: Props) => {
    const { backgroundColor, borderColor, textColor: color } = options;
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (i: number) => setDraggedIndex(i);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, i: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === i) return;

        const updatedValues = [...values];
        const draggedItem = values[draggedIndex];

        updatedValues.splice(draggedIndex, 1);
        updatedValues.splice(i, 0, draggedItem);

        setDraggedIndex(i);
        onChange(updatedValues);
    };
    const handleDragEnd = () => setDraggedIndex(null);

    const addValue = () => onChange((prev) => [...prev, '']);
    const removeValue = (index: number) =>
        onChange((prev) => prev.filter((_, i) => i !== index));
    const updateValues = (index: number, value: string) =>
        onChange((prev) => {
            const updatedValues = [...prev];
            updatedValues[index] = value;
            return updatedValues;
        });

    return (
        <div style={{ ...styles.container, backgroundColor, borderColor }}>
            <div style={styles.listWrapper}>
                {values.map((q, index) => (
                    <div
                        key={index}
                        draggable={!isReadOnly}
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        style={{
                            ...styles.item,
                            ...(draggedIndex === index
                                ? styles.itemDragged
                                : {}),
                            borderColor,
                            backgroundColor,
                        }}
                    >
                        <div
                            style={{
                                ...styles.dragHandle,
                            }}
                        >
                            <GripVertical />
                        </div>
                        <input
                            type="text"
                            value={q}
                            readOnly={isReadOnly}
                            onChange={(e) =>
                                updateValues(index, e.target.value)
                            }
                            placeholder={`Enter a ${label}...`}
                            style={{ ...styles.input, color }}
                        />

                        {!isReadOnly && (
                            <button
                                onClick={() => removeValue(index)}
                                style={{
                                    ...styles.deleteButton,
                                }}
                                title="remove this option"
                            >
                                <TrashCan size="15" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.buttonGroup}>
                {!isReadOnly && (
                    <button
                        onClick={addValue}
                        style={{
                            ...styles.addButton,
                            backgroundColor,
                            borderColor,
                            color,
                        }}
                    >
                        Add {label}
                    </button>
                )}
                <div style={styles.info}>
                    <Info
                        message={
                            isReadOnly ? 'Locked - Read only' : description
                        }
                        options={{
                            backgroundColor: color,
                            color: backgroundColor,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DynamicList;
