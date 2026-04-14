import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function build() {
  const sd = new StyleDictionary({
    source: [join(__dirname, 'src/**/*.json')],
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

  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  build().then(() => console.log('✓ tokens built'));
}
