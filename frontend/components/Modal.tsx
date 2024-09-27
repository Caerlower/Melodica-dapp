// src/components/Modal.tsx

import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <button className="modal__close-button" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="modal__content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
