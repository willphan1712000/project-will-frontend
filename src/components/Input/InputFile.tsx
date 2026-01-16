import React, { useState } from 'react';

// Define a union type for all possible file types
type FileType =
    // Image types
    | 'image/*'
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/webp'
    | 'image/svg+xml'
    | 'image/bmp'
    | 'image/tiff'
    // Video types
    | 'video/*'
    | 'video/mp4'
    | 'video/mpeg'
    | 'video/quicktime'
    | 'video/x-msvideo'
    | 'video/x-ms-wmv'
    | 'video/webm'
    | 'video/ogg'
    // Audio types
    | 'audito/*'
    | 'audio/mpeg'
    | 'audio/wav'
    | 'audio/ogg'
    | 'audio/aac'
    | 'audio/flac'
    | 'audio/x-wav'
    // Document types
    | 'application/*'
    | 'application/pdf'
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'application/vnd.ms-powerpoint'
    | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    | 'text/plain'
    | 'text/csv'
    | 'application/json'
    | 'application/zip'
    // Others
    | 'application/octet-stream'
    | 'application/x-tar'
    | 'application/x-rar-compressed';

interface Props {
    file?: File;
    onChoose: (file: File) => void;
    onCancel?: () => void;
    acceptType?: FileType;
}

/**
 * InputFile component
 * @param file file object -> binary information
 * @param onChoose if a file is chosen
 * @param onCancel if a popup is closed without any chosen data
 * @param acceptType accepted file type
 */
const InputFile = ({
    file,
    onChoose,
    onCancel = () => {},
    acceptType = 'image/*',
    ...props
}: Props & React.ComponentProps<'input'>) => {
    const [key, setKey] = useState<number>(Date.now()); // when this key changes, the input re-renders, causing the value to be clear

    return (
        <input
            key={key}
            type="file"
            {...props}
            onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const file = target.files?.[0];
                if (file) {
                    setKey(Date.now());
                    onChoose(file);
                } else {
                    onCancel();
                }
            }}
        />
    );
};

export default InputFile;
