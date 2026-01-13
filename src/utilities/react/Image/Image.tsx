/**
 * A wrap around HTML Image Element
 * - Add default alt text
 * - Add false draggable
 */
const Image = ({ ...props }: React.ComponentProps<'img'>) => {
    return <img {...props} alt="Will-Image-Component" draggable={false} />;
};

export default Image;
