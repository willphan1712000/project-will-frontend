import React, { useState, useRef } from 'react';
import styles from './styles';
import WUII from '..';
import Info from '../Info/Info';

interface FileDropZoneProps {
    label: string;
    accept: string;
    file?: File;
    onFileSelect: (file: File) => void;
    options?: {
        backgroundColor?: string;
        borderColor?: string;
        textColor?: string;
        destructive?: string;
    };
}

/**
 * FileDropZone component, providing an interactive drag-and-drop area for uploading files.
 * Supports file validation by extension and custom styling options.
 *
 * @param label The text prompt displayed inside the drop zone
 * @param accept Allowed file extension/type suffix, e.g. ".js" or ".css"
 * @param file Optional initial file to display as selected
 * @param onFileSelect Callback function triggered when a valid file is dropped or selected
 * @param options Styling customization options
 * @param options.backgroundColor Custom background color of the drop zone
 * @param options.borderColor Custom border color of the drop zone
 * @param options.textColor Custom text and icon color inside the drop zone
 * @param options.destructive Custom color for error text
 *
 * @example
 * ```tsx
 * <FileDropZone
 *   label="Upload configuration"
 *   accept=".json"
 *   file={initialFile}
 *   onFileSelect={(file) => console.log('Selected file:', file)}
 *   options={{
 *     backgroundColor: '#fafafa',
 *     borderColor: '#1a73e8',
 *     textColor: '#3c4043',
 *     destructive: '#d93025',
 *   }}
 * />
 * ```
 */
const FileDropZone = ({
    label,
    value,
    setValue,
    styling = {},
    config = {},
    isReadOnly = false,
    description = '',
}: WUII<File>) => {
    const {
        backgroundColor = '#fff',
        borderColor = '#fff',
        textColor: color = '#000',
        destructive = '#df0408',
    } = styling;
    const { accept } = config;

    if (!setValue) return;

    const [isDragOver, setIsDragOver] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(value);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const validateFile = (file: File) => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        const expected = accept ? accept.replace('.', '').toLowerCase() : '';

        if (extension !== expected) {
            setError(`Please upload a ${expected.toUpperCase()} file.`);
            return false;
        }
        setError(null);
        return true;
    };

    const handleDrop = (e: React.DragEvent) => {
        if (isReadOnly) return;
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0]!;
            if (validateFile(file)) {
                setSelectedFile(file);
                setValue(file);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0]!;
            if (validateFile(file)) {
                setSelectedFile(file);
                setValue(file);
            }
        }
    };

    const handleClick = () => {
        if (isReadOnly) return;
        fileInputRef.current?.click();
    };

    return (
        <div
            style={{
                ...styles.dropZone,
                backgroundColor,
                borderColor,
                ...(isDragOver || isHovered
                    ? { backgroundColor: borderColor, borderColor: color }
                    : {}),
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept={accept}
                onChange={handleFileChange}
            />

            <svg
                style={{ ...styles.icon, color }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>

            <div style={{ ...styles.label, color }}>{label}</div>
            <div style={{ ...styles.hint, color }}>
                Drag & drop or click to upload
                <div style={styles.info}>
                    <Info
                        message={
                            isReadOnly ? 'Locked - Read Only' : description
                        }
                        options={{
                            backgroundColor: color,
                            color: backgroundColor,
                        }}
                    />
                </div>
            </div>

            {selectedFile && (
                <div style={styles.fileInfo}>
                    <span>📄 {selectedFile.name}</span>
                </div>
            )}

            {error && (
                <div style={{ ...styles.error, color: destructive }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default FileDropZone;
