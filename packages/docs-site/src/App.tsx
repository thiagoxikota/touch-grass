import { Routes, Route } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { Index } from './pages/Index';
import { RecipesIndex } from './pages/recipes/Index';

const foundations = import.meta.glob('./pages/foundations/*.tsx', { eager: true });
const primitives = import.meta.glob('./pages/primitives/*.tsx', { eager: true });
const patterns = import.meta.glob('./pages/patterns/*.tsx', { eager: true });
const recipes = import.meta.glob('./pages/recipes/*.tsx', { eager: true });

function getKebabCase(filename: string) {
  if (filename === 'BeRealStampPage') return 'bereal-stamp'; // Edge case
  return filename
    .replace('Page', '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function getComponent(module: any) {
  const key = Object.keys(module).find(k => k !== 'default');
  return key ? module[key] : module.default;
}

export function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Index />} />
        {Object.entries(foundations).map(([path, module]) => {
          const Comp = getComponent(module);
          const name = path.split('/').pop()!.replace('.tsx', '');
          return <Route key={path} path={`/foundations/${getKebabCase(name)}`} element={<Comp />} />;
        })}
        {Object.entries(primitives).map(([path, module]) => {
          const Comp = getComponent(module);
          const name = path.split('/').pop()!.replace('.tsx', '');
          return <Route key={path} path={`/primitives/${getKebabCase(name)}`} element={<Comp />} />;
        })}
        {Object.entries(patterns).map(([path, module]) => {
          const Comp = getComponent(module);
          const name = path.split('/').pop()!.replace('.tsx', '');
          return <Route key={path} path={`/patterns/${getKebabCase(name)}`} element={<Comp />} />;
        })}
        <Route path="/recipes" element={<RecipesIndex />} />
        {Object.entries(recipes).map(([path, module]) => {
          const name = path.split('/').pop()!.replace('.tsx', '');
          if (name === 'Index') return null;
          const Comp = getComponent(module);
          return <Route key={path} path={`/recipes/${getKebabCase(name)}`} element={<Comp />} />;
        })}
      </Routes>
    </Shell>
  );
}
