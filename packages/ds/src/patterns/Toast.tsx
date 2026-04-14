import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'default' | 'danger' | 'success';
}

interface ToastContextType {
  toast: (message: string, type?: ToastProps['type']) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

// Brutalist Provider without Portal dependency to keep it simple, absolute fixed on DOM.
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((message: string, type: ToastProps['type'] = 'default') => {
    const id = crypto.randomUUID();
    // Z-index instant stack
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Brutalist: instant removal after 3s, zero fade/ease.
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            role={t.type === 'default' ? 'status' : 'alert'}
            aria-live={t.type === 'default' ? 'polite' : 'assertive'}
            className={cn(
              'pointer-events-auto border-2 px-5 py-4 font-mono text-[13px] font-black uppercase text-fg bg-bg',
              t.type === 'danger' && 'border-danger text-danger',
              t.type === 'success' && 'border-earned text-earned',
              t.type === 'default' && 'border-hairline'
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
