// src/components/ui/Alert.js
import React from 'react';

export const Alert = ({ variant = 'default', children }) => {
    const variantClasses = {
        default: 'bg-blue-100 border-blue-500 text-blue-700',
        destructive: 'bg-red-100 border-red-500 text-red-700',
    };

    return (
        <div
            className={`flex items-start border-l-4 p-4 rounded ${variantClasses[variant]}`}
            role="alert"
        >
            {children}
        </div>
    );
};

export const AlertDescription = ({ children }) => (
    <p className="ml-3 text-sm">{children}</p>
);
