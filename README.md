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
