import type { ReactNode } from 'react';
import { Nav } from './Nav';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <Nav />
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-[1280px] mx-auto p-12">{children}</div>
      </main>
    </div>
  );
}
