interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
}

export const Modal = ({
  children,
  onClose,
  closeOnOutsideClick = true,
}: ModalProps) => {
  return (
    <div
      className="fixed top-0 left-0 z-50 w-svw h-svh flex justify-center items-center bg-neutral-950 bg-opacity-60"
      onClick={() => (closeOnOutsideClick ? onClose() : "")}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-base-300 rounded-md shadow-lg px-2 md:px-6 py-10 relative"
      >
        <div
          className="absolute right-4 top-4 cursor-pointer"
          onClick={onClose}
        >
          [close]
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
