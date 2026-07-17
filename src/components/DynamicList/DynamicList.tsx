import React, { useState } from 'react';
import { styles } from './styles';
import { GripVertical, TrashCan } from '../Icons';
import Info from '@/src/components/Info/Info';
import WUII from '..';

/**
 * A dynamic, interactive list component that allows users to add, remove,
 * edit, and reorder (via drag-and-drop) a list of text inputs.
 * Supports read-only mode, custom labelling, and hover descriptions.
 *
 * @param value - array of values in the list
 * @param setValue - callback to update values
 * @param isReadOnly - if true, disables adding, deleting, and dragging items
 * @param label - label used for the button and placeholders (defaults to 'value')
 * @param description - description text for the info tooltip
 * @param styling - configuration for background, border and text colors
 *
 * @example
 * ```tsx
 * const [values, setValues] = useState(['Option 1', 'Option 2']);
 * <DynamicList
 *   value={values}
 *   setValue={setValues}
 *   isReadOnly={false}
 *   label="option"
 *   description="List of options"
 *   styling={{
 *     backgroundColor: '#ffffff',
 *     borderColor: '#e2e8f0',
 *     textColor: '#1a202c'
 *   }}
 * />
 * ```
 */
const DynamicList = ({
    value = [],
    setValue = () => {},
    isReadOnly = false,
    label = 'value',
    description = '',
    styling = {},
}: WUII<string[]>) => {
    const {
        backgroundColor = '#fff',
        borderColor = '#f0f0f0',
        textColor: color = '#000',
    } = styling;
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (i: number) => setDraggedIndex(i);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, i: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === i) return;

        const updatedValues = [...value];
        const draggedItem = value[draggedIndex];

        updatedValues.splice(draggedIndex, 1);
        updatedValues.splice(i, 0, draggedItem);

        setDraggedIndex(i);
        setValue(updatedValues);
    };
    const handleDragEnd = () => setDraggedIndex(null);

    const addValue = () => setValue([...value, '']);
    const removeValue = (index: number) =>
        setValue(value.filter((_, i) => i !== index));
    const updateValues = (index: number, newValue: string) => {
        const updatedValues = [...value];
        updatedValues[index] = newValue;
        setValue(updatedValues);
    };

    return (
        <div style={{ ...styles.container, backgroundColor, borderColor }}>
            <div style={styles.listWrapper}>
                {value.map((q, index) => (
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
