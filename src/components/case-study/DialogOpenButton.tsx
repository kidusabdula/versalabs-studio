'use client';

// Opens a native <dialog> rendered on the server. The browser then handles the
// rest: focus moves into the dialog and stays there, Escape closes it, and the
// page behind it is inert.
export default function DialogOpenButton({
  target,
  className,
  children,
}: {
  target: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => (document.getElementById(target) as HTMLDialogElement | null)?.showModal()}
      className={className}
    >
      {children}
    </button>
  );
}
