import { defineConfig } from 'tsup';
import cssPlugin from "esbuild-plugin-react18-css";
 
export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    // injectStyle: true,
    loader: {
        '.css': 'css',
        '.module.css': 'local-css'
    },
    esbuildPlugins: [cssPlugin()]
});