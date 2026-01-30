import { ImageEditor, Image, UploadImage, Button, ImageUtilities } from '@';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditLine } from 'react-icons/ri';

import styles, { others } from './styles';

import { useEffect, useRef, useState } from 'react';

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
 * @param src source of an image which will be converted to base64 format automatically
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
 * const [src, setValue] = useState<string|undefined>(initialImageStringUrl)
 *
 * return (
 *  <Avatar src={src} setValue={setValue} options={{defaultImage: unknown}}/>
 * )
 */
const Avatar = ({ src, setValue, options }: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isNew, setNew] = useState<boolean>(false);

    const defaultImage = useRef<string | undefined>(undefined);
    const initialImage = useRef<string | undefined>(undefined);

    const uploadImageRef = useRef<HTMLInputElement>(null);

    const isAbleToEdit = initialImage.current
        ? src !== defaultImage.current && src !== initialImage.current
        : false; // derived state from src
    const isAbleToRemove = initialImage.current
        ? src !== defaultImage.current
        : false; // derived state from src

    useEffect(() => {
        (async function setSrc() {
            defaultImage.current =
                (await ImageUtilities.FromStringToImageSrc(
                    options?.defaultImage
                )) ?? options?.defaultImage;
            initialImage.current =
                (await ImageUtilities.FromStringToImageSrc(src)) ?? src;

            setValue(src ? initialImage.current : defaultImage.current);
        })();
    }, []);

    return (
        <div style={styles.container}>
            <ImageEditor
                src={src}
                setSrc={setValue}
                isOpen={isOpen}
                setOpen={setOpen}
                isNew={isNew}
            />
            <Image src={src} style={styles.image} />

            <Button
                style={styles.upload}
                onClick={() => uploadImageRef.current?.click()}
            >
                <IoCloudUploadOutline size={others.iconSize} />
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
                    <FaTrashCan size={others.iconSize} color="red" />
                    Remove
                </Button>
            )}
            {isAbleToEdit && (
                <Button
                    style={styles.edit}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <RiEditLine size={others.iconSize} />
                    Edit
                </Button>
            )}
        </div>
    );
};

export default Avatar;
