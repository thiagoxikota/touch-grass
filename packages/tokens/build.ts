import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function build() {
  // Main build: exclude color-light.json (handled separately below as a
  // light-mode override). Globbing all *.json would pull both into one set
  // and cause duplicate/contradictory --color-* declarations in tokens.css.
  const sd = new StyleDictionary({
    source: [
      join(__dirname, 'src/color.json'),
      join(__dirname, 'src/border.json'),
      join(__dirname, 'src/grid.json'),
      join(__dirname, 'src/motion.json'),
      join(__dirname, 'src/space.json'),
      join(__dirname, 'src/type.json'),
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: join(__dirname, 'dist/'),
        files: [{
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root' }
        }]
      },
      tailwind: {
        transformGroup: 'css',
        buildPath: join(__dirname, 'dist/'),
        files: [{
          destination: 'tailwind.theme.css',
          format: 'css/variables',
          options: { selector: '@theme' }
        }]
      },
      figma: {
        transformGroup: 'js',
        buildPath: join(__dirname, 'dist/'),
        files: [{
          destination: 'figma-tokens.json',
          format: 'json/w3c'
        }]
      },
      swift: {
        transformGroup: 'ios-swift',
        buildPath: join(__dirname, 'Sources/TouchGrassTokens/'),
        files: [{
          destination: 'TouchGrassTokens.swift',
          format: 'ios-swift/class.swift',
          filter: (token) => token.type === 'color',
          options: {
            className: 'TouchGrassTokens',
            imports: ['UIKit']
          }
        }]
      },
      js: {
        transformGroup: 'js',
        buildPath: join(__dirname, 'dist/'),
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6'
          },
          {
            destination: 'tokens.d.ts',
            format: 'typescript/es6-declarations'
          }
        ]
      },
      twPreset: {
        transformGroup: 'css',
        buildPath: join(__dirname, 'dist/'),
        files: [{
          destination: 'tailwind-preset.js',
          format: 'tailwind/preset'
        }]
      }
    }
  });

  // Register a W3C-format JSON output so figma-tokens.json uses $value/$type.
  sd.registerFormat({
    name: 'json/w3c',
    format: ({ dictionary }) => {
      const out: Record<string, unknown> = {};
      for (const token of dictionary.allTokens) {
        let cursor = out;
        const path = token.path;
        for (let i = 0; i < path.length - 1; i++) {
          const key = path[i]!;
          if (!cursor[key]) cursor[key] = {};
          cursor = cursor[key] as Record<string, unknown>;
        }
        cursor[path[path.length - 1]!] = { $value: token.value, $type: token.type };
      }
      return JSON.stringify(out, null, 2);
    }
  });

  sd.registerFormat({
    name: 'tailwind/preset',
    format: ({ dictionary }) => {
      const colors: Record<string, string> = {};
      for (const token of dictionary.allTokens) {
        if (token.type === 'color') {
          const name = token.path.slice(1).join('-');
          colors[name] = `var(--${token.name})`;
        }
      }
      const preset = {
        theme: {
          extend: {
            colors
          }
        }
      };
      return `module.exports = ${JSON.stringify(preset, null, 2)};`;
    }
  });

  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();

  const sdLight = new StyleDictionary({
    source: [join(__dirname, 'src/color-light.json')],
    platforms: {
      cssLight: {
        transformGroup: 'css',
        buildPath: join(__dirname, 'dist/'),
        files: [{
          destination: 'light.css',
          format: 'css/variables',
          options: { selector: '[data-theme="light"]' }
        }]
      }
    }
  });

  await sdLight.cleanAllPlatforms();
  await sdLight.buildAllPlatforms();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  build().then(() => console.log('✓ tokens built'));
}
