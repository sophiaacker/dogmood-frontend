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

export function SnoutScoutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
    >
      <circle cx="56" cy="50" r="30" fill="hsl(var(--primary))" />
      <path
        d="M25.6 42.1c0-11.2 9.1-20.3 20.3-20.3V46c0 11.2-9.1 20.3-20.3 20.3S5.3 57.2 5.3 46c0-11.2 9.1-20.3 20.3-20.3v-4.6c-13.7 0-24.9 11.2-24.9 24.9s11.2 24.9 24.9 24.9 24.9-11.2 24.9-24.9V42.1z"
        fill="hsl(var(--foreground))"
      />
      <path
        d="M85.4 46c0-13.7-11.2-24.9-24.9-24.9v4.6c11.2 0 20.3 9.1 20.3 20.3v4.1c0 13.7-11.2 24.9-24.9 24.9s-24.9-11.2-24.9-24.9V46c0-11.2 9.1-20.3 20.3-20.3V21.1C47.2 21.1 36 32.3 36 46v4.1c0 13.7 11.2 24.9 24.9 24.9s24.9-11.2 24.9-24.9V46z"
        fill="hsl(var(--foreground))"
      />
      <path
        d="M48.2,32.2c-3.1-2.4-6.8-3.9-10.8-3.9"
        stroke="hsl(var(--foreground))"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M68.2,32.2c3.1-2.4,6.8-3.9,10.8-3.9"
        stroke="hsl(var(--foreground))"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="49.5" cy="42.5" r="3.5" fill="hsl(var(--foreground))" />
      <circle cx="69.5" cy="42.5" r="3.5" fill="hsl(var(--foreground))" />
      <circle cx="50" cy="65" r="8.7" fill="hsl(var(--card))" />
      <circle cx="68" cy="65" r="8.7" fill="hsl(var(--card))" />
    </svg>
  );
}
