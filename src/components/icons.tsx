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
      width="100"
      height="100"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 8.8C25.6 8.8 14.8 17.1 12.3 29.9c-5.3 1.2-9.1 5.9-9.1 11.4 0 6.5 5.3 11.8 11.8 11.8 2.3 0 4.5-.7 6.3-1.8 2.5 8.3 10.3 14.5 19.5 14.5s17-6.2 19.5-14.5c1.8 1.1 4 1.8 6.3 1.8 6.5 0 11.8-5.3 11.8-11.8 0-5.5-3.8-10.2-9.1-11.4C65.2 17.1 54.4 8.8 40 8.8z"
        fill="#D27D2D"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M26.2 53.4c-1.7-1.4-2.8-3.4-2.8-5.7 0-4.1 3.3-7.4 7.4-7.4s7.4 3.3 7.4 7.4c0 2.3-1.1 4.3-2.8 5.7.1 0 .1 0 .2.1 4.7-2.3 8-7 8-12.4 0-8.2-6.7-14.8-14.8-14.8S14 32.9 14 41.1c0 5.4 3.3 10.1 8 12.4.1 0 .1 0 .2-.1z"
        fill="hsl(var(--primary-foreground))"
        opacity="0.8"
      />
      <path
        d="M37.6 47.9c0 1.9-1.5 3.4-3.4 3.4s-3.4-1.5-3.4-3.4c0-1.9 1.5-3.4 3.4-3.4s3.4 1.5 3.4 3.4z"
        fill="hsl(var(--primary-foreground))"
      />
      <path
        d="M36.1 49.3c1.5 1 3.4 1 4.9 0 .4-.3.9-.8.9-1.4 0-.8-.7-1.4-1.6-1.4h-2.7c-.9 0-1.6.6-1.6 1.4 0 .6.4 1.1.9 1.4z"
        fill="#F59E47"
      />
      <circle cx="33" cy="35" r="2.5" fill="hsl(var(--primary-foreground))" />
      <circle cx="47" cy="35" r="2.5" fill="hsl(var(--primary-foreground))" />
      <path
        d="M31.5 30.5c.5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44.5 30.5c.5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
