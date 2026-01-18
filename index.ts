// DropSelect component
export { default as DropdownSelect } from './src/components/DropdownSelect/DropdownSelect';
export type { Options } from './src/components/DropdownSelect/DropdownSelect';

// RangeSlider component
export { default as RangeSlider } from './src/components/RangeSlider/RangeSlider';

// OptionSlider component
export { default as OptionSlider } from './src/components/OptionSlider/OptionSlider';
export type { Options as SliderOptions } from './src/components/OptionSlider/OptionSlider';

// ColorPickerSlider
export { default as ColorPickerSlider } from './src/components/ColorPickerSlider/ColorPickerSlider';

// MultiSelect
export { default as MultiSelect } from './src/components/MultiSelect/MultiSelect';

// Button
export { default as Button } from './src/components/Buttons/Button';

// Avatar
export { default as Avatar } from './src/components/Avatar/Avatar';

// Input
export { default as InputGoogle } from './src/components/Input/InputGoogle/InputGoogle';
export { default as TextArea } from './src/components/Input/TextArea/TextArea';
export { default as InputFile } from './src/components/Input/InputFile';

// Image
export { default as UploadImage } from './src/components/Image/UploadImage';
export { default as Image } from './src/components/Image/Image';
export { default as ImageEditor } from './src/components/Image/ImageEditor/ImageEditor';

// Utilities
export { default as Canvas } from './src/utilities/canvas/Canvas';
export { default as ImageUtilities } from './src/utilities/canvas/Image';
export { default as Transform } from './src/utilities/Transform/Transform';

// Utility tools
export { default as tools } from './src/utilities/tools/tools';

// auth
export type { AuthInterface } from './src/auth';
export type { StorageInterface } from './src/auth';
export {
    useSession,
    SessionProvider,
    type SessionType,
    useAuthClient,
} from './src/auth/react';
