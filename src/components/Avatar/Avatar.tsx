import { ImageEditor, Image, UploadImage, Button } from '@';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import { RiEditLine } from 'react-icons/ri';

import styles from './styles';

import { useRef, useState } from 'react';

interface Props {
    src?: string;
    setValue: (src?: string) => void;
    defaultImage?: string;
}

/**
 * Avatar component. Combination of
 * - ImageEditor
 * - Image
 * - UploadImage
 * - Button
 *
 * There components work together to provide smooth image editing process
 * @param src source of an image
 * @param setValue set state function for src
 * @param defaultImage default image string
 *
 * @example
 * ... component declaration
 * const [src, setValue] = useState<string|undefined>(defaultImage)
 *
 * return (
 *  <Avatar src={src} setValue={setValue} defaultImage={defaultImage} />
 * )
 */
const Avatar = ({ src, setValue, defaultImage }: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isNew, setNew] = useState<boolean>(false);

    const uploadImageRef = useRef<HTMLInputElement>(null);

    return (
        <div style={styles.container}>
            <ImageEditor
                src={src}
                setSrc={setValue}
                isOpen={isOpen}
                setOpen={setOpen}
                isNew={isNew}
            />
            <Image
                src={src}
                style={{
                    borderRadius: '50%',
                    border: 'solid 3px black',
                    background: 'white',
                    objectFit: 'cover',
                }}
            />

            <Button
                style={styles.upload}
                onClick={() => uploadImageRef.current?.click()}
            >
                <IoCloudUploadOutline size="20" />
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

            {src !== defaultImage && (
                <>
                    <Button
                        style={styles.remove}
                        onClick={() => {
                            setValue(defaultImage);
                            setNew((prev) => !prev);
                        }}
                    >
                        <FaTrashCan size="20" color="red" />
                        Remove
                    </Button>
                    <Button
                        style={styles.edit}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <RiEditLine size="20" />
                        Edit
                    </Button>
                </>
            )}
        </div>
    );
};

export default Avatar;
