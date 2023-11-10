import { ReactNode } from 'react';
import './modal.scss';
import { X } from 'lucide-react';

type ModalProps = {
  children: ReactNode;
  title: string;
  className: string;
  onCancel?(): void;
  footer?: ReactNode;
}

export function Modal({ title, children, className, onCancel, footer }: ModalProps) {
  return (
    <div className="modal">
      <div className={`modalContainer ${className}`}>
        <div className="title">
          <h3>{title}</h3>
          {onCancel && <X className='iconClose' onClick={onCancel} />}
        </div>
        <div className="modalBody">
          {children}
        </div>
        {footer && (
          <div className="modalFooter">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
