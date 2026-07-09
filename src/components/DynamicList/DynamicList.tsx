import React, { useState } from 'react';
import { styles } from './styles';
import { GripVertical, TrashCan } from '../Icons';

interface Props {
    values: string[];
    onChange: (values: React.SetStateAction<string[]>) => void;
    options?: {
        label?: string;
        backgroundColor?: string;
        borderColor?: string;
        textColor?: string;
    };
}

/**
 * A dynamic, interactive list component that allows users to add, remove,
 * edit, and reorder (via drag-and-drop) a list of text inputs.
 *
 * @example
 * ```tsx
 * const [values, setValues] = useState(['Option 1', 'Option 2']);
 * <DynamicList
 *   values={values}
 *   onChange={setValues}
 *   options={{
 *     label: 'option',
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
    options = {
        label: 'value',
        backgroundColor: '#fff',
        borderColor: '#f0f0f0',
        textColor: '#000',
    },
}: Props) => {
    const { backgroundColor, borderColor, textColor: color, label } = options;
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [hoveredDeleteIndex, setHoveredDeleteIndex] = useState<number | null>(
        null
    );

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
                        draggable
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
                            onChange={(e) =>
                                updateValues(index, e.target.value)
                            }
                            placeholder={`Enter a ${label}...`}
                            style={{ ...styles.input, color }}
                        />

                        <button
                            onClick={() => removeValue(index)}
                            onMouseEnter={() => setHoveredDeleteIndex(index)}
                            onMouseLeave={() => setHoveredDeleteIndex(null)}
                            style={{
                                ...styles.deleteButton,
                            }}
                            title="remove this option"
                        >
                            <TrashCan size="15" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={addValue}
                style={{
                    ...styles.addButton,
                    backgroundColor,
                    borderColor,
                    color,
                }}
            >
                Add {options.label}
            </button>
        </div>
    );
};

export default DynamicList;
