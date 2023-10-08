import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, className, show }) => {
  return (
    <div
      className={`modal ${className ? className : ""} ${
        show ? "show" : "hidden"
      }`}
    >
      <div className="modal-inner">
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
