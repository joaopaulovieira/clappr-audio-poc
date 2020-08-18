module.exports = {
  env: { jest: true },
  globals: {
    jest: true,
    window: true,
    document: true,
    Event: true,
    console: true,
    ClapprAudioPlayer: true,
    $: true,
    require: true,
    process: true,
    __dirname: true,
    module: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: { sourceType: 'module', ecmaVersion: 2018 },
  rules: {
    // Possible Errors
    'getter-return': ['error', { allowImplicit: true }], // overrides eslint:recommended
    'no-await-in-loop': ['error'],
    'no-console': ['error'],
    'no-extra-parens': [
      'warn',
      'all',
      { conditionalAssign: false, returnAssign: false, nestedBinaryExpressions: false, enforceForArrowConditionals: false },
    ],
    'no-import-assign': ['error'],
    'no-template-curly-in-string': ['error'],
    // Best Practices
    'accessor-pairs': ['error', { setWithoutGet: true }],
    'array-callback-return': ['error', { allowImplicit: true }],
    curly: ['error', 'multi', 'consistent'],
    'default-param-last': ['error'],
    'dot-location': ['error', 'property'],
    'dot-notation': ['error'],
    eqeqeq: ['error', 'smart'],
    'max-classes-per-file': ['error', 1],
    'no-alert': ['error'],
    'no-caller': ['error'],
    'no-eq-null': ['error'],
    'no-else-return': ['error'],
    'no-empty-function': ['warn', { allow: ['arrowFunctions', 'methods', 'generatorMethods', 'setters'] }],
    'no-eval': ['error'],
    'no-extend-native': ['error'],
    'no-extra-bind': ['error'],
    'no-extra-label': ['error'],
    'no-implicit-coercion': ['error', { boolean: false }],
    'no-implicit-globals': ['error'],
    'no-implied-eval': ['error'],
    'no-iterator': ['error'],
    'no-labels': ['error'],
    'no-lone-blocks': ['error'],
    'no-loop-func': ['error'],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-multi-str': ['error'],
    'no-new': ['error'],
    'no-new-func': ['error'],
    'no-new-wrappers': ['error'],
    'no-octal-escape': ['error'],
    'no-param-reassign': ['error'],
    'no-proto': ['error'],
    'no-return-assign': ['error', 'except-parens'],
    'no-return-await': ['error'],
    'no-self-compare': ['error'],
    'no-script-url': ['error'],
    'no-sequences': ['error'],
    'no-throw-literal': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-useless-call': ['error'],
    'no-useless-concat': ['error'],
    'no-useless-return': ['error'],
    'no-void': ['error'],
    'prefer-regex-literals': ['error'],
    radix: ['error'],
    'require-await': ['error'],
    'wrap-iife': ['error', 'inside'],
    yoda: ['error', 'never'],
    // Variables
    'no-label-var': ['error'],
    'no-restricted-globals': ['error', { name: 'event', message: 'Use local parameter instead.' }],
    'no-undef-init': ['error'],
    'no-use-before-define': ['error'],
    // Stylistic Issues
    'array-bracket-newline': ['error', { multiline: true }],
    'array-bracket-spacing': ['error', 'never'],
    'array-element-newline': ['error', 'consistent'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: ['error', { properties: 'always' }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'func-style': ['error', 'expression'],
    'function-call-argument-newline': ['error', 'consistent'],
    'func-name-matching': ['error', 'always'],
    'function-paren-newline': ['error', 'consistent'],
    'implicit-arrow-linebreak': ['error', 'beside'],
    indent: ['error', 2],
    'key-spacing': ['error', { mode: 'strict' }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': ['error', 'always'],
    'max-depth': ['error', 4],
    'max-len': ['error', 144, { ignoreTrailingComments: true, ignoreUrls: true }],
    'new-cap': ['error'],
    'new-parens': ['error', 'always'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
    'no-array-constructor': ['error'],
    'no-lonely-if': ['error'],
    'no-multi-assign': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1}],
    'no-negated-condition': ['error'],
    'no-new-object': ['error'],
    'no-tabs': ['error'],
    'no-trailing-spaces': ['error'],
    'no-unneeded-ternary': ['error'],
    'no-whitespace-before-property': ['error'],
    'object-curly-newline': ['error', { multiline: true }],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'one-var': ['error', { initialized: 'never', uninitialized: 'consecutive' }],
    'operator-assignment': ['error', 'always'],
    'operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
    'padded-blocks': ['error', 'never'],
    'prefer-object-spread': ['error'],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    semi: ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error'],
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'spaced-comment': ['error', 'always'],
    'switch-colon-spacing': ['error', { before: false, after: true }],
    'template-tag-spacing': ['error', 'always'],
    'unicode-bom': ['error', 'never'],
    // ES6
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error',  { before: true, after: true }],
    'generator-star-spacing': ['error', { before: false, after: true }],
    'no-confusing-arrow': ['error'],
    'no-duplicate-imports': ['error'],
    'no-useless-computed-key': ['error'],
    'no-useless-constructor': ['error'],
    'no-useless-rename': ['error'],
    'no-var': ['error'],
    'object-shorthand': ['error', 'always'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
    'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
    'prefer-destructuring': ['error', { array: true, object: true }, { enforceForRenamedProperties: false }],
    'prefer-numeric-literals': ['error'],
    'prefer-rest-params': ['error'],
    'prefer-spread': ['error'],
    'prefer-template': ['error'],
    'rest-spread-spacing': ['error', 'never'],
    'symbol-description': ['error'],
    'template-curly-spacing': ['error', 'never'],
    'yield-star-spacing': ['error', { before: false, after: true }],
  },
}
