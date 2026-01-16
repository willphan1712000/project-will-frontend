import { InputFile, ImageUtilities } from '@';

interface Props {
    setSrc?: (src?: string) => void;
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
        const src = await ImageUtilities.FromFileToImageSrc(file);
        if (!src) return;

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
