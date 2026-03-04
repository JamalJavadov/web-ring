import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContextType {
    addToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 3s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="bg-surface border border-border text-text px-6 py-3 rounded-sm shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5"
                        role="alert"
                    >
                        {toast.type === 'success' && <div className="w-2 h-2 rounded-full bg-accent text-accent" />}
                        {toast.type === 'error' && <div className="w-2 h-2 rounded-full bg-accent2 text-accent2" />}
                        {toast.type === 'info' && <div className="w-2 h-2 rounded-full bg-silver text-silver" />}
                        <span className="text-sm tracking-wide">{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
