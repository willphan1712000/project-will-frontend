interface Props {
    src?: string;
    setSrc?: (src: string) => void;
    isOpen?: boolean;
}

/**
 * Image Editor component. This provides
 * - Image transformation such as dragging, scaling, rotating
 * - Color editing, contrast, ...
 * - ...
 *
 * How it works
 * @param src source of an image to edit
 * @param isOpen controls whether the editor is isOpen or close
 * @param setSrc modify source state after editting (after changing isOpen to false)
 */
const ImageEditor = ({ src, setSrc = () => {}, isOpen = false }: Props) => {
    return (
        <div>
            {/* <Controller>
            {children}
        </Controller> */}
            {/* <Tools /> */}
        </div>
    );
};

export default ImageEditor;
