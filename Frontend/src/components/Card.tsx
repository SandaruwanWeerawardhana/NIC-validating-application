import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export const Card: React.FC<CardProps> = ({ title, className, children, ...props }) => {
    return (
        <div className={cn(
            "glass-card overflow-hidden animate-enter hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-500",
            className
        )} {...props}>
            {title && (
                <div className="px-6 py-4 border-b border-white/5 bg-white/5">
                    <h3 className="font-semibold text-slate-200">{title}</h3>
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
