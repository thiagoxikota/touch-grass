import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function build() {
  function escapeSwiftString(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  function camelCaseToken(pathParts: string[]): string {
    const cleaned = pathParts.map((part) => part.replace(/[^a-zA-Z0-9]/g, ' ').trim());
    const words = cleaned
      .flatMap((part) => part.split(/\s+/))
      .filter(Boolean);
    if (words.length === 0) return 'token';
    const [first, ...rest] = words;
    return first.toLowerCase() + rest.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }

  function colorToSwiftColor(value: string): string {
    const hex = value.replace('#', '').trim();
    const normalized = hex.length === 3
      ? hex.split('').map((c) => c + c).join('')
      : hex;
    const intValue = Number.parseInt(normalized, 16);
    const r = ((intValue >> 16) & 0xFF) / 255;
    const g = ((intValue >> 8) & 0xFF) / 255;
    const b = (intValue & 0xFF) / 255;
    return `color(${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)}, 1)`;
  }

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
        transformGroup: 'js',
        buildPath: join(__dirname, 'Sources/'),
        files: [{
          destination: 'TouchGrassTokens.swift',
          format: 'swift/touch-grass',
          options: {
            className: 'TouchGrassTokens'
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
    name: 'swift/touch-grass',
    format: ({ dictionary, options }) => {
      const className = (options as { className?: string })?.className ?? 'TouchGrassTokens';
      const lines: string[] = [
        '',
        '//',
        '// TouchGrassTokens.swift',
        '//',
        '',
        '// Do not edit directly, this file was auto-generated.',
        '',
        '',
        'import Foundation',
        'import CoreGraphics',
        '#if canImport(UIKit)',
        'import UIKit',
        'public typealias TouchGrassColor = UIColor',
        '#elseif canImport(AppKit)',
        'import AppKit',
        'public typealias TouchGrassColor = NSColor',
        '#else',
        '#error("Unsupported Apple platform: expected UIKit or AppKit")',
        '#endif',
        '',
        `public class ${className} {`
      ];

      const sorted = [...dictionary.allTokens].sort((a, b) => a.name.localeCompare(b.name));
      for (const token of sorted) {
        const identifier = camelCaseToken(token.path);
        const raw = String(token.value);
        const comment = token.comment ? ` /** ${token.comment} */` : '';

        if (token.type === 'color' && raw.startsWith('#')) {
          lines.push(`    public static let ${identifier} = ${colorToSwiftColor(raw)}${comment}`);
          continue;
        }

        if (token.type === 'spacing' || token.type === 'fontSize' || token.type === 'borderWidth' || token.type === 'borderRadius' || token.type === 'size') {
          const numeric = Number.parseFloat(raw.replace(/px$/, ''));
          lines.push(`    public static let ${identifier} = CGFloat(${numeric.toFixed(2)})${comment}`);
          continue;
        }

        if (token.type === 'duration') {
          const numeric = Number.parseFloat(raw.replace(/ms$/, ''));
          lines.push(`    public static let ${identifier} = ${numeric.toFixed(2)}${comment}`);
          continue;
        }

        if (token.type === 'letterSpacing') {
          const numeric = Number.parseFloat(raw.replace(/em$/, ''));
          lines.push(`    public static let ${identifier} = ${numeric.toFixed(3)}${comment}`);
          continue;
        }

        if (token.type === 'fontWeight') {
          lines.push(`    public static let ${identifier} = ${Number.parseInt(raw, 10)}${comment}`);
          continue;
        }

        lines.push(`    public static let ${identifier} = "${escapeSwiftString(raw)}"${comment}`);
      }

      lines.push('');
      lines.push('    private static func color(_ r: CGFloat, _ g: CGFloat, _ b: CGFloat, _ a: CGFloat) -> TouchGrassColor {');
      lines.push('        #if canImport(UIKit)');
      lines.push('        return UIColor(red: r, green: g, blue: b, alpha: a)');
      lines.push('        #else');
      lines.push('        return NSColor(calibratedRed: r, green: g, blue: b, alpha: a)');
      lines.push('        #endif');
      lines.push('    }');
      lines.push('}');
      return lines.join('\n');
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
