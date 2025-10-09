import { defineConfig } from 'tsup';
import cssModulePlugin from "esbuild-plugin-css-module";
 
export default defineConfig({
    watch: true,
    format: ['cjs', 'esm'],
    entry: ['./index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    loader: {
        '.css': 'css',
    },
    esbuildPlugins: [
        cssModulePlugin({
            generateScopedName: "[name]__[local]___[hash:base64:5]",
        })
    ]
});