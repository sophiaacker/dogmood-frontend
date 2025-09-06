import type { SVGProps } from "react";

export function PawPrintIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="4" cy="8" r="2" />
      <path d="M9 10c-1.5 1.5-3 3.5-3 5.5a5.5 5.5 0 0 0 11 0c0-2-1.5-4-3-5.5" />
      <path d="M14.5 13.5c-1.5 1-2.5 3-2.5 4.5" />
    </svg>
  );
}
