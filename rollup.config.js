import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
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

const postcssOptions = {
  use: [
    [
      'sass', {
        includePaths: [
          'node_modules/@clappr/core/src/base/scss',
          'src/scss',
        ],
      },
    ],
  ],
}

const plugins = [
  image({ dom: true }),
  babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
  html(),
  postcss(postcssOptions),
  size(),
  filesize(),
  dev && serve({ contentBase: ['dist', 'public'], host: '0.0.0.0', port: '8080' }),
  dev && livereload({ watch: ['dist', 'public'] }),
  analyzeBundle && visualize({ open: true }),
]

const mainBundle = {
  input: 'src/main.js',
  output: [
    {
      name: 'ClapprAudioPlayer',
      file: pkg.main,
      format: 'umd',
    },
    minimize && {
      name: 'ClapprAudioPlayer',
      file: 'dist/clappr-audio-poc.min.js',
      format: 'umd',
      plugins: terser(),
    },
  ],
  plugins: [resolve(), commonjs(), ...plugins],
}

const esmBundle = {
  input: 'src/main.js',
  output: {
    name: 'ClapprAudioPlayer',
    file: pkg.module,
    format: 'esm',
  },
  plugins,
}

export default [mainBundle]
