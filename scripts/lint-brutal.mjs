import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lint only the design system source — docs-site is allowed to display
// token values, hex codes, and forced-state previews for educational purposes.
const DIRECTORIES_TO_LINT = [
  path.join(__dirname, '../packages/ds/src'),
];

const BRUTAL_VIOLATIONS = [
  { regex: /rounded-((sm)|(md)|(lg)|(xl)|(2xl)|(3xl)|(full))/g, message: 'Zero rounded corners allowed. Found border-radius utility' },
  { regex: /transition(?!-none\b)(-[a-z-]+)?/g, message: 'Zero motion allowed. Found transition utility (use transition-none to explicitly disable motion)' },
  { regex: /duration-[0-9]+/g, message: 'Zero motion allowed. Found duration utility' },
  { regex: /ease-[a-z-]+/g, message: 'Zero motion allowed. Found ease utility' },
  { regex: /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/g, message: 'No hex codes allowed in components. Use tokens from var(--color-*) or Tailwind utilities' },
  { regex: /(?<![a-zA-Z-])opacity-(?!0\b)\d+/g, message: 'No opacity-based hierarchy. Use fg / fg-muted / fg-subtle tokens instead of opacity utilities' },
  { regex: /rgba\([^)]+,\s*0\.\d+\)/g, message: 'No alpha rgba() in DS styles. Use neutral tokens (fg-muted, fg-subtle) for hierarchy' }
  { regex: /animate-(?!none)[a-z-]+/g, message: 'Zero motion allowed. Found animate utility' },
  { regex: /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/g, message: 'No hex codes allowed in components. Use tokens from var(--color-*) or Tailwind utilities' },
  { regex: /text-[a-z]+\/[0-9]+/g, message: 'No opacity text allowed. Use --color-muted token for text hierarchy, not opacity modifiers' }
];

let hasViolations = false;

function scanFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.tsx', '.ts'].includes(ext)) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    BRUTAL_VIOLATIONS.forEach(rule => {
      let match;
      // create a new regex instance for stateful global matching without bleeding
      const localRegex = new RegExp(rule.regex.source, rule.regex.flags);
      while ((match = localRegex.exec(line)) !== null) {
        // Exclude matching comments naively
        if (line.includes('//') && line.indexOf('//') < match.index) continue;
        
        console.error(`❌ Brutalism Violation:`);
        console.error(`   File: ${filePath.split('touch-grass/')[1] || filePath}:${index + 1}`);
        console.error(`   Match: "${match[0]}"`);
        console.error(`   Reason: ${rule.message}\n`);
        hasViolations = true;
      }
    });
  });
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else {
      scanFile(fullPath);
    }
  }
}

console.log('⚔️  Running Brutal Linter...');
DIRECTORIES_TO_LINT.forEach(scanDir);

if (hasViolations) {
  console.error('🛑 Linter failed. Fix the violations above to maintain brutalism.');
  process.exit(1);
} else {
  console.log('✅ Brutal Linter passing. Zero motion, zero rounding, zero hex codes, zero opacity hierarchy.');
}
