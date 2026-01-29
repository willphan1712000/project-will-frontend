import { ImageEditor, Image, UploadImage, Button, ImageUtilities } from '@';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditLine } from 'react-icons/ri';

import styles, { others } from './styles';

import { useEffect, useRef, useState } from 'react';

interface Props {
    src?: string;
    setValue: (src?: string) => void;
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
 * @example
 * ... component declaration
 * const [src, setValue] = useState<string|undefined>(initialImageStringUrl)
 *
 * return (
 *  <Avatar src={src} setValue={setValue} />
 * )
 */
const Avatar = ({ src, setValue }: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isNew, setNew] = useState<boolean>(false);

    const uploadImageRef = useRef<HTMLInputElement>(null);
    const defaultImage = useRef<string>('');

    async function setSrc() {
        const translatedSrc = await ImageUtilities.FromStringToImageSrc(src);

        if (!translatedSrc) return;

        defaultImage.current = translatedSrc;
        setValue(translatedSrc);
    }

    useEffect(() => {
        setSrc();
    }, [src]);

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

            {src !== defaultImage.current && defaultImage.current !== '' && (
                <>
                    <Button
                        style={styles.remove}
                        onClick={() => {
                            setValue(defaultImage.current);
                            setNew((prev) => !prev);
                        }}
                    >
                        <FaTrashCan size={others.iconSize} color="red" />
                        Remove
                    </Button>
                    <Button
                        style={styles.edit}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <RiEditLine size={others.iconSize} />
                        Edit
                    </Button>
                </>
            )}
        </div>
    );
};

export default Avatar;
