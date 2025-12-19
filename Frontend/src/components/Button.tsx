import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const variants = {
        primary: 'glass-btn',
        secondary: 'bg-slate-700/50 text-slate-200 border border-white/10 hover:bg-slate-700/70 hover:text-white',
        danger: 'bg-red-500/20 text-red-200 border border-red-500/30 hover:bg-red-500/30 hover:text-red-100',
        ghost: 'hover:bg-white/5 text-slate-400 hover:text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-2.5',
        lg: 'px-8 py-3.5 text-lg',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};
