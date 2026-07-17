import { ImageEditor, Image, UploadImage, Button, ImageUtilities } from '@';
import styles, { others } from './styles';
import { useEffect, useRef, useState } from 'react';
import { CloudUpload, Edit, TrashCan } from '@/src/components/Icons';
import WUII from '..';

interface Props {
    src?: string;
    setValue: (src?: string) => void;
    options?: {
        defaultImage?: string;
    };
}

/**
 * Avatar component. Combination of
 * - ImageEditor
 * - Image
 * - UploadImage
 * - Button
 *
 * These components work together to provide smooth image editing process
 *
 * @param value source of an image which will be converted to base64 format automatically
 * @param setValue set state function for src
 *
 * @dataflow
 * - source of an image can be undefined. This case, source should be set to default image. In case there is no default image provided, source should be undefined. As source of image is edited, source changes and updates on the image preview
 * - Every source needs to be converted to base64 format using provided conversion method
 * - There is a defaultImage reference that stores the value of default image across the entire component so it can be used to restore default image when clicking delete button or when source of image is undefined
 * - There is an initialImage reference that stores the value of an initial value of image source
 *
 * @example
 * ... component declaration
 * const [value, setValue] = useState<string|undefined>(initialImageStringUrl)
 *
 * return (
 *  <Avatar value={value} setValue={setValue} options={{defaultImage: unknown}}/>
 * )
 */
const Avatar = ({ value, setValue, config }: WUII<string>) => {
    if (!value || !setValue) return;

    const [isOpen, setOpen] = useState<boolean>(false);
    const [isNew, setNew] = useState<boolean>(false);

    const defaultImage = useRef<string | undefined>(undefined);
    const initialImage = useRef<string | undefined>(undefined);

    const uploadImageRef = useRef<HTMLInputElement>(null);

    const isAbleToEdit = initialImage.current
        ? value !== defaultImage.current && value !== initialImage.current
        : false; // derived state from value
    const isAbleToRemove = initialImage.current
        ? value !== defaultImage.current
        : false; // derived state from value

    useEffect(() => {
        (async function setSrc() {
            defaultImage.current =
                (await ImageUtilities.FromStringToImageSrc(config?.default)) ??
                config?.default;
            initialImage.current =
                (await ImageUtilities.FromStringToImageSrc(value)) ?? value;

            value === initialImage.current
                ? setNew((prev) => !prev)
                : undefined; // this is important because in case value is equal to initial image, setValue below is not going to give another re-render
            setValue(value ? initialImage.current : defaultImage.current); // another re-render here is important
        })();
    }, []);

    return (
        <div style={styles.container}>
            <ImageEditor
                src={value}
                setSrc={setValue}
                isOpen={isOpen}
                setOpen={setOpen}
                isNew={isNew}
            />
            <Image src={value} style={styles.image} />

            <Button
                style={styles.upload}
                onClick={() => uploadImageRef.current?.click()}
            >
                <CloudUpload size={others.iconSize} />
                Upload
            </Button>
            <UploadImage
                ref={uploadImageRef}
                setSrc={(e?: string) => {
                    setValue(e);
                    setOpen(true);
                    setNew((prev) => !prev);
                }}
            />

            {isAbleToRemove && (
                <Button
                    style={styles.remove}
                    onClick={() => {
                        setValue(defaultImage.current ?? undefined);
                        setNew((prev) => !prev);
                    }}
                >
                    <TrashCan size={others.iconSize} color="red" />
                    Remove
                </Button>
            )}
            {isAbleToEdit && (
                <Button
                    style={styles.edit}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <Edit size={others.iconSize} />
                    Edit
                </Button>
            )}
        </div>
    );
};

export default Avatar;
