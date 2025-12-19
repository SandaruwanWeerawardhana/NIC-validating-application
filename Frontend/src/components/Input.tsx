import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full group">
                {label && (
                    <label className="block text-sm font-medium text-slate-400 mb-1 group-focus-within:text-blue-400 transition-colors">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            w-full rounded-xl px-4 py-3 outline-none
            glass-input
            ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-400 animate-enter">{error}</p>}
            </div>
        );
    }
);
