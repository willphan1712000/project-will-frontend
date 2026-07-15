<img style="width: 15%" src="./will.png" alt="Will frontend package logo">

# `@willphan1712000/frontend`

Reusable React UI components and frontend utilities packaged for application development.

## What this package includes

### Components
- `DropdownSelect`
- `MultiSelect`
- `RangeSlider`
- `OptionSlider`
- `ColorPickerSlider`
- `DynamicList`
- `FileDropZone`
- `Info`
- `Overlay`
- `Button`
- `ModernButton`
- `Avatar`
- `InputGoogle`
- `TextArea`
- `InputFile`
- `UploadImage`
- `Image`
- `ImageEditor`

### Utilities
- `Canvas`
- `ImageUtilities`
- `Transform`
- `tools`
- `LinearAlgebra`
- `useThemeState`

### Auth helpers
- `useSession`
- `SessionProvider`
- `useAuthClient`
- `AuthInterface`
- `StorageInterface`

## Installation

This package is intended for React applications.

```bash
npm install @willphan1712000/frontend
```

Make sure your app already has React and React DOM installed:

```bash
npm install react react-dom
```

## Quick start

```tsx
import { useState } from 'react';
import {
  DropdownSelect,
  RangeSlider,
  Button,
  type Options,
} from '@willphan1712000/frontend';

const options: Options = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export default function Example() {
  const [priority, setPriority] = useState('medium');
  const [amount, setAmount] = useState('50');

  return (
    <div>
      <DropdownSelect
        options={options}
        value={priority}
        onChange={setPriority}
      />

      <RangeSlider
        value={amount}
        onChange={setAmount}
        min="0"
        max="100"
        width="240"
      />

      <Button
        buttonType="gradient"
        content="Submit"
        type="button"
      />
    </div>
  );
}
```

## Core component usage

### `DropdownSelect`

```tsx
import { DropdownSelect, type Options } from '@willphan1712000/frontend';

const options: Options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
];
```

Props:
- `options: { label: string; value: string }[]`
- `value: string`
- `onChange: (value: string) => void`

### `MultiSelect`

```tsx
import { useState } from 'react';
import { MultiSelect } from '@willphan1712000/frontend';

const options = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
];

const [values, setValues] = useState<string[]>([]);
```

Props:
- `options: { label: string; value: string }[]`
- `value: string[]`
- `onChange: React.Dispatch<React.SetStateAction<string[]>>`
- `width?: string`

### `RangeSlider`

```tsx
import { useState } from 'react';
import { RangeSlider } from '@willphan1712000/frontend';

export default function Example() {
  const [value, setValue] = useState('50');

  return (
    <RangeSlider
      value={value}
      onChange={setValue}
      min="0"
      max="100"
      width="240"
      color="#2563eb"
    />
  );
}
```

Props:
- `value: string`
- `onChange: (value: string) => void`
- `min?: string`
- `max?: string`
- `color?: string`
- `width?: string`

### `OptionSlider`

The package exports `SliderOptions` for this component.

```tsx
import { useState } from 'react';
import { OptionSlider } from '@willphan1712000/frontend';

const options = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export default function Example() {
  const [value, setValue] = useState('medium');

  return (
    <OptionSlider
      value={value}
      onChange={setValue}
      options={options}
      width="260"
      color="#2563eb"
    />
  );
}
```

Props:
- `value: string`
- `onChange: (value: string) => void`
- `options: { label: ReactNode; value: string }[]`
- `width?: string`
- `color?: string`

### `ColorPickerSlider`

`ColorPickerSlider` allows users to select a color by dragging the slider across a spectrum, with custom tooltip info display and read-only support.

```tsx
import { useState } from 'react';
import { ColorPickerSlider } from '@willphan1712000/frontend';

export default function Example() {
  const [value, setValue] = useState('#2563eb');

  return (
    <ColorPickerSlider
      value={value}
      onChange={setValue}
      isReadOnly={false}
      description="Pick your favorite color"
      options={{
        width: '240',
        backgroundColor: '#ffffff',
        textColor: '#000000',
      }}
    />
  );
}
```

Props:
- `value: string` - The current color value.
- `onChange: (value: string) => void` - Callback function triggered when the slider value changes.
- `isReadOnly?: boolean` - If set to `true`, disables changing the color slider and shows "Locked - Read Only" tooltip message instead of the description (defaults to `false`).
- `description?: string` - Description tooltip text shown on hover of the info icon (defaults to `''`).
- `options?: object` - Optional custom styling configurations:
  - `width?: string` - The width of the slider track in pixels (defaults to `'200'`).
  - `backgroundColor?: string` - Background color of the tooltip (defaults to `'#000'`).
  - `textColor?: string` - Text color of the tooltip (defaults to `'#fff'`).

### `Button`

```tsx
import { Button } from '@willphan1712000/frontend';

export default function Example() {
  return (
    <Button
      buttonType="gradient"
      content="Submit"
      type="button"
      onClick={() => console.log('clicked')}
    />
  );
}
```

Supports:
- `buttonType="normal"`
- `buttonType="solid"`
- `buttonType="gradient"`

Additional styling props:
- `content?: string`
- `main?: string`
- `text?: string`
- `first?: string`
- `second?: string`
- `isLoading?: boolean`

Also accepts normal button props such as `onClick`, `type`, `disabled`, and `style`.

### `Avatar`

`Avatar` combines image upload, preview, edit, and remove flows.

```tsx
import { useState } from 'react';
import { Avatar } from '@willphan1712000/frontend';

const [src, setSrc] = useState<string | undefined>(undefined);

<Avatar
  src={src}
  setValue={setSrc}
  options={{ defaultImage: '/images/default-avatar.png' }}
/>;
```

Props:
- `src?: string`
- `setValue: (src?: string) => void`
- `options?: { defaultImage?: string }`

### `DynamicList`

`DynamicList` is an interactive list component that allows users to add, remove, edit, and reorder (via drag-and-drop) a list of text inputs. It supports read-only mode, custom labelling, and hover descriptions.

```tsx
import { useState } from 'react';
import { DynamicList } from '@willphan1712000/frontend';

const [values, setValues] = useState<string[]>(['Option 1', 'Option 2']);

<DynamicList
  values={values}
  onChange={setValues}
  isReadOnly={false}
  label="option"
  description="List of options"
  options={{
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    textColor: '#1a202c'
  }}
/>
```

Props:
- `values: string[]` - An array of strings representing the current values in the list.
- `onChange: (values: React.SetStateAction<string[]>) => void` - Callback triggered when the list values change.
- `isReadOnly?: boolean` - If set to `true`, disables adding, deleting, editing, and dragging items (defaults to `false`).
- `label?: string` - Label used for input placeholders and the "Add" button (defaults to `'value'`).
- `description?: string` - Description tooltip text shown on hover of the info icon (defaults to `''`).
- `options?: object` - Optional configurations:
  - `backgroundColor?: string` - Background color for the list container and items (defaults to `'#fff'`).
  - `borderColor?: string` - Border color for the list container and items (defaults to `'#f0f0f0'`).
  - `textColor?: string` - Text color for input values and buttons (defaults to `'#000'`).

### `FileDropZone`

`FileDropZone` provides an interactive drag-and-drop area for uploading files, with custom validation by file extension and support for custom styling.

```tsx
import { useState } from 'react';
import { FileDropZone } from '@willphan1712000/frontend';

const [file, setFile] = useState<File | undefined>(undefined);

<FileDropZone
  label="Upload configuration"
  accept=".json"
  file={file}
  onFileSelect={setFile}
  options={{
    backgroundColor: '#fafafa',
    borderColor: '#1a73e8',
    textColor: '#3c4043',
    destructive: '#d93025'
  }}
/>
```

Props:
- `label: string` - The text prompt displayed inside the drop zone.
- `accept: string` - Allowed file extension/type suffix (e.g. `".json"`).
- `file?: File` - Optional initial file to display as selected.
- `onFileSelect: (file: File) => void` - Callback function triggered when a valid file is dropped or selected.
- `options?: object` - Optional configuration for custom styling:
  - `backgroundColor?: string` - Custom background color of the drop zone (defaults to `'#fff'`).
  - `borderColor?: string` - Custom border color of the drop zone (defaults to `'#fff'`).
  - `textColor?: string` - Custom text and icon color inside the drop zone (defaults to `'#000'`).
  - `destructive?: string` - Custom color for error messages (defaults to `'#df0408'`).

### `Info`

`Info` renders a hover-help icon that displays a tooltip-style message when hovered. The tooltip automatically flips to the opposite side when it would overflow the viewport edges.

```tsx
import { Info } from '@willphan1712000/frontend';

<Info
  message="Helpful guidance for this field."
  options={{
    color: '#1f2937',
    backgroundColor: '#f3f4f6',
  }}
/>
```

Props:
- `message?: string` - Tooltip content shown on hover.
- `options?: { color?: string; backgroundColor?: string }` - Optional styling for the tooltip text and background.

### `Overlay`

`Overlay` renders a full-screen background overlay (with a backdrop blur effect) around a central content container. Clicking outside the content container (on the overlay itself) triggers a close callback.

```tsx
import { useState } from 'react';
import { Overlay } from '@willphan1712000/frontend';

const [isOpen, setIsOpen] = useState(false);

<Overlay
  open={isOpen}
  close={() => setIsOpen(false)}
  options={{
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }}
>
  <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
    <h3>Overlay Content</h3>
    <p>This is inside the overlay.</p>
  </div>
</Overlay>
```

Props:
- `open?: boolean` - Controls whether the overlay is visible.
- `close?: () => void` - Callback function triggered when the overlay is clicked (outside the child element).
- `options?: object` - Optional custom configurations:
  - `backgroundColor?: string` - Custom background color of the overlay (defaults to `'#fff'`).
- `children?: React.ReactNode` - Content inside the center container.

### `InputGoogle`

`InputGoogle` is a floating label input component designed to mimic Google's sign-in input fields, with built-in tooltip info display and read-only support.

```tsx
import { useState } from 'react';
import { InputGoogle } from '@willphan1712000/frontend';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <InputGoogle
      value={value}
      setValue={setValue}
      label="Email or phone"
      description="Enter your registered email address"
      isReadOnly={false}
      options={{
        focusColor: '#1a73e8',
        backgroundColor: '#ffffff',
        textColor: '#202124',
        borderColor: '#dadce0',
      }}
    />
  );
}
```

Props:
- `value?: string` - The current value of the input field.
- `setValue?: (value?: string) => void` - Callback function triggered on input change.
- `label?: string` - The text for the floating label (defaults to `'Input Google Component Label'`).
- `description?: string` - Description tooltip text shown on hover of the info icon (defaults to `'Input Google Description'`). Displays when the input is not read-only.
- `isReadOnly?: boolean` - If set to `true`, the input becomes read-only and displays a "Locked - Read Only" tooltip message instead of the description (defaults to `false`).
- `options?: object` - Optional configuration for custom styling:
  - `focusColor?: string` - Border and label color when the input is focused.
  - `backgroundColor?: string` - Background color of the input container and label background.
  - `textColor?: string` - Color of the text input and default label state.
  - `borderColor?: string` - Default border color when not focused.

### `TextArea`

`TextArea` is a floating label multi-line text input component with built-in tooltip info display and read-only support.

```tsx
import { useState } from 'react';
import { TextArea } from '@willphan1712000/frontend';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <TextArea
      value={value}
      setValue={setValue}
      label="Bio"
      description="Tell us about yourself"
      isReadOnly={false}
      options={{
        focusColor: '#1a73e8',
        backgroundColor: '#ffffff',
        textColor: '#202124',
        borderColor: '#dadce0',
      }}
    />
  );
}
```

Props:
- `value?: string` - The current value of the textarea.
- `setValue?: (value?: string) => void` - Callback function triggered on value change.
- `label?: string` - The text for the floating label (defaults to `'Text Area Component Label'`).
- `isReadOnly?: boolean` - If set to `true`, the textarea becomes read-only and displays a "Locked - Read Only" tooltip message instead of the description (defaults to `false`).
- `description?: string` - Description tooltip text shown on hover of the info icon (defaults to `'Text Area Description'`). Displays when the textarea is not read-only.
- `options?: object` - Optional configuration for custom styling:
  - `focusColor?: string` - Border and label color when the textarea is focused.
  - `backgroundColor?: string` - Background color of the textarea container and label background.
  - `textColor?: string` - Color of the text and default label state.
  - `borderColor?: string` - Default border color when not focused.

## Auth usage

The auth helpers are designed around an auth client object that implements `AuthInterface`.

```tsx
import {
  SessionProvider,
  useAuthClient,
  type AuthInterface,
} from '@willphan1712000/frontend';

class AuthClient implements AuthInterface {
  getSignInUrl() {
    return '/signin';
  }

  async signin() {}

  async validate() {
    return {
      username: 'will',
      email: 'will@example.com',
      role: 'admin',
    };
  }

  async signout() {}
}

const authClient = new AuthClient();

function AppProviders({ children }: { children: React.ReactNode }) {
  const session = useAuthClient(authClient);

  return (
    <SessionProvider value={session}>
      {children}
    </SessionProvider>
  );
}
```

`useAuthClient` returns:
- `isLoading`
- `session`
- `auth`

## Theme management usage

### `useThemeState`

A custom React hook for managing, persisting, and applying the application's theme state (`'light'`, `'dark'`, or `'system'`). It synchronizes state with browser `localStorage` and applies/removes the theme class on `document.body`.

```tsx
import { useThemeState } from '@willphan1712000/frontend';

const Example = () => {
  const { setThemeState, getThemeState } = useThemeState();

  return (
    <div>
      <p>Current Theme: {getThemeState()}</p>
      <button onClick={() => setThemeState('light')}>Light</button>
      <button onClick={() => setThemeState('dark')}>Dark</button>
      <button onClick={() => setThemeState('system')}>System</button>
    </div>
  );
};
```

#### API Reference

- `getThemeState(): 'light' | 'dark' | 'system'`  
  Retrieves the active theme setting from `localStorage`. Defaults to `'light'`.
- `setThemeState(mode: 'light' | 'dark' | 'system'): void`  
  Sets the active theme setting.
  - `'light'`: Stores `'light'`, removes `'will-dark'` class from `document.body`, and disables OS preference event listeners.
  - `'dark'`: Stores `'dark'`, adds `'will-dark'` class to `document.body`, and disables OS preference event listeners.
  - `'system'`: Stores `'system'`, automatically toggles `'will-dark'` based on OS preferences, and registers a listener to react to future OS preference changes.

#### Configuration Details

- **Local Storage Key:** `'will-theme'`
- **CSS Class Applied to `<body>`:** `'will-dark'`

## Exported utilities

```ts
import {
  Canvas,
  ImageUtilities,
  Transform,
  tools,
  LinearAlgebra,
} from '@willphan1712000/frontend';
```

Included helpers:
- `tools.handleAsync(...)`
- `tools.textPreprocessing(...)`

## Development

Install dependencies:

```bash
npm install
```

Build the package:

```bash
npm run build
```

Run in watch mode during development:

```bash
npm run dev
```

## Local package testing with `npm link`

Inside this package:

```bash
npm link
```

Inside the app where you want to test it:

```bash
npm link @willphan1712000/frontend
```

If React reports multiple copies loaded, link the consumer app's React instance:

```bash
npm link <path_to_your_testing_project>/node_modules/react
```

## Notes

- The package is built with `tsup`.
- It ships CommonJS, ESM, and TypeScript declaration files.
- Source code is written in TypeScript and React.

## Contributing

If you find a bug or want to improve the package, open an issue or submit a pull request.

Portfolio:
- [will-five.vercel.app](https://will-five.vercel.app/w)

Contact:
- [Facebook](https://www.facebook.com/phanthanhnha123200/)
- [Instagram](https://www.instagram.com/phanthanhnha_0117/)