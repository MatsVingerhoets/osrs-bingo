export default function SpinnerIcon() {
  return (
    <svg
      aria-hidden="true"
      className="inline-block animate-spin w-4 h-4 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
      <path
        d="M22 12c0-5.52-4.48-10-10-10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="opacity-75"
      />
    </svg>
  );
}
