/*
 * Generate cross-platform token outputs from the DTCG source with Style
 * Dictionary: web CSS variables, iOS Swift, and Android XML. One source
 * (tokens/buena.tokens.json) → many platforms.
 *
 *   npm run build:tokens   # runs build-tokens.mjs first, then this
 *
 * Color + dimension + duration tokens are emitted to every platform; composite
 * types (typography, cubicBezier) stay in the DTCG file for tools that read it.
 */
import StyleDictionary from 'style-dictionary';

const simple = (t) => ['color', 'dimension', 'duration'].includes(t.$type);
const colorsOnly = (t) => t.$type === 'color';

const sd = new StyleDictionary({
  source: ['tokens/buena.tokens.json'],
  log: { verbosity: 'silent', warnings: 'disabled' },
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'buena-tokens.css',
          format: 'css/variables',
          filter: simple,
          options: { selector: ':root' },
        },
      ],
    },
    ios: {
      transformGroup: 'ios-swift',
      buildPath: 'dist/tokens/',
      files: [
        {
          destination: 'BuenaTokens.swift',
          format: 'ios-swift/class.swift',
          filter: colorsOnly,
          options: { className: 'BuenaTokens', import: ['UIKit'] },
        },
      ],
    },
    android: {
      transformGroup: 'android',
      buildPath: 'dist/tokens/',
      files: [
        { destination: 'buena_colors.xml', format: 'android/resources', filter: colorsOnly },
        {
          destination: 'buena_dimens.xml',
          format: 'android/resources',
          filter: (t) => t.$type === 'dimension',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log('✓ wrote dist/tokens/{buena-tokens.css, BuenaTokens.swift, buena_colors.xml, buena_dimens.xml}');
