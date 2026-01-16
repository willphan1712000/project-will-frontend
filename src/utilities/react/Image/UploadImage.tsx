import InputFile from '../Input/InputFile';

interface Props {
    setSrc?: (src?: string) => void;
}

function ToImageSrc(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                resolve(readerEvent.target?.result as string);
            } else {
                reject('Error getting the image source');
            }
        };

        reader.onerror = () => {
            reject('Error getting the image source');
        };
    });
}

/**
 * Upload Image component
 * - Upload image binary and convert it to base 64 format
 * @param setSrc
 * @returns
 */
const UploadImage = ({
    setSrc = () => {},
    ...props
}: Props & React.ComponentProps<'input'>) => {
    async function handleSetSrc(file: File) {
        const src = await ToImageSrc(file);
        setSrc(src);
    }

    return (
        <>
            <InputFile
                onChoose={handleSetSrc}
                acceptType="image/*"
                {...props}
                hidden
            />
        </>
    );
};

export default UploadImage;
