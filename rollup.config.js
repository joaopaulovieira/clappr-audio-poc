import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import html from 'rollup-plugin-html'
import postcss from 'rollup-plugin-postcss'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import filesize from 'rollup-plugin-filesize'
import size from 'rollup-plugin-sizes'
import visualize from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const dev = !!process.env.DEV
const analyzeBundle = !!process.env.ANALYZE_BUNDLE
const minimize = !!process.env.MINIMIZE

const plugins = [
  babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
  html(),
  postcss(),
  size(),
  filesize(),
  dev && serve({ contentBase: ['dist', 'public'], host: '0.0.0.0', port: '8080' }),
  dev && livereload({ watch: ['dist', 'public'] }),
  analyzeBundle && visualize({ open: true }),
]

const mainBundle = {
  input: 'src/main.js',
  external: ['@clappr/core'],
  output: [
    {
      name: 'ClapprAudioPlayer',
      file: pkg.main,
      format: 'umd',
      globals: { '@clappr/core': 'Clappr' },
    },
    minimize && {
      name: 'ClapprAudioPlayer',
      file: 'dist/clappr-audio-poc.min.js',
      format: 'umd',
      globals: { '@clappr/core': 'Clappr' },
      plugins: terser(),
    },
  ],
  plugins: [resolve(), commonjs(), ...plugins],
}

const esmBundle = {
  input: 'src/main.js',
  external: ['@clappr/core', /@babel\/runtime/],
  output: {
    name: 'ClapprAudioPlayer',
    file: pkg.module,
    format: 'esm',
    globals: { '@clappr/core': 'Clappr' },
  },
  plugins,
}

export default [mainBundle, esmBundle]