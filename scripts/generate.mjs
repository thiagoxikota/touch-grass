import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const [, , type, name] = process.argv;

if (!type || !name) {
  console.error('\n❌ Usage: pnpm run generate <primitive|pattern> <ComponentName>');
  console.error('Example: pnpm run generate primitive Modal\n');
  process.exit(1);
}

if (type !== 'primitive' && type !== 'pattern') {
  console.error('\n❌ Error: Type must be either "primitive" or "pattern"\n');
  process.exit(1);
}

const targetType = type === 'primitive' ? 'primitives' : 'patterns';
const nameUpper = name.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();

const tplDir = path.join(__dirname, 'templates');
const componentTemplate = fs.readFileSync(path.join(tplDir, 'component.tsx.tpl'), 'utf-8');
const testTemplate = fs.readFileSync(path.join(tplDir, 'test.tsx.tpl'), 'utf-8');
const pageTemplate = fs.readFileSync(path.join(tplDir, 'page.tsx.tpl'), 'utf-8');

const processTemplate = (tpl) => tpl.replace(/__NAME__/g, name).replace(/__NAMECAP__/g, nameUpper);

const getPath = (relPath) => path.join(__dirname, '..', relPath);

const filesToCreate = [
  { path: getPath(`packages/ds/src/${targetType}/${name}.tsx`), content: processTemplate(componentTemplate) },
  { path: getPath(`packages/ds/tests/${targetType}/${name}.test.tsx`), content: processTemplate(testTemplate) },
  { path: getPath(`packages/docs-site/src/pages/${targetType}/${name}Page.tsx`), content: processTemplate(pageTemplate) },
];

console.log(`\n🔨 Generating ${type} ${name}...`);

filesToCreate.forEach((file) => {
  if (fs.existsSync(file.path)) {
    console.error(`❌ Skipped: ${file.path} already exists.`);
  } else {
    fs.mkdirSync(path.dirname(file.path), { recursive: true });
    fs.writeFileSync(file.path, file.content, 'utf-8');
    console.log(`✅ Created: ${file.path.split('touch-grass/')[1] || path.basename(file.path)}`);
  }
});

// Instruct the user to add the export to barrel file
console.log(`\n⚠️  Don't forget to export your new component in:
   packages/ds/src/index.ts

   export { ${name}, type ${name}Props } from './${targetType}/${name}';\n`);
