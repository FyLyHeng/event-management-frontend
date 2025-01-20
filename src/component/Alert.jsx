import React from 'react';

const Alert = ({ message, type, onClose }) => {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✔️';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return '';
        }
    };

    return (
        <div className={`alert alert-${type}`}>
            <span className="alert-icon">{getIcon()}</span>
            <span className="alert-message">{message}</span>
            <button className="alert-close" onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default Alert;
