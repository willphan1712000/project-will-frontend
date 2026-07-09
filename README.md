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

Props:
- `value: string`
- `onChange: (value: string) => void`
- `min?: string`
- `max?: string`
- `color?: string`
- `width?: string`

### `OptionSlider`

The package exports `SliderOptions` for this component.

Props:
- `value: string`
- `onChange: (value: string) => void`
- `options: { label: ReactNode; value: string }[]`
- `width?: string`
- `color?: string`

### `ColorPickerSlider`

Props:
- `value: string`
- `onChange: (value: string) => void`
- `width?: string`

### `Button`

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

`DynamicList` is an interactive list component that allows users to add, remove, edit, and reorder (via drag-and-drop) a list of text inputs.

```tsx
import { useState } from 'react';
import { DynamicList } from '@willphan1712000/frontend';

const [values, setValues] = useState<string[]>(['Option 1', 'Option 2']);

<DynamicList
  values={values}
  onChange={setValues}
  options={{
    label: 'option',
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    textColor: '#1a202c'
  }}
/>
```

Props:
- `values: string[]` - An array of strings representing the current values in the list.
- `onChange: (values: React.SetStateAction<string[]>) => void` - Callback triggered when the list values change.
- `options?: object` - Optional configurations:
  - `label?: string` - Label used for input placeholders and the "Add" button (defaults to `'value'`).
  - `backgroundColor?: string` - Background color for the list container and items (defaults to `'#fff'`).
  - `borderColor?: string` - Border color for the list container and items (defaults to `'#f0f0f0'`).
  - `textColor?: string` - Text color for input values and buttons (defaults to `'#000'`).

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
