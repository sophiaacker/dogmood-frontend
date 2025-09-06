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
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#3A2D27" strokeWidth="4" strokeLinejoin="round">
        <path
          d="M60.6,51.5c3.8-3.4,6.2-8.2,6.2-13.5c0-10.2-8.3-18.5-18.5-18.5h-8.5c-10.2,0-18.5,8.3-18.5,18.5c0,5.3,2.4,10.1,6.2,13.5C18.6,56,12,62.3,12,70h56C68,62.3,61.4,56,60.6,51.5z"
          fill="#8C542C"
        />
        <path
          d="M58,26.2C54.8,16.5,45.8,10,35.8,10c-10,0-19,6.5-22.2,16.2c-0.8-0.2-1.6-0.3-2.5-0.3c-7.2,0-13.1,5.9-13.1,13.1s5.9,13.1,13.1,13.1c1.5,0,3-0.3,4.4-0.8C20,62,27,68,35.8,68s15.8-6,20.2-16.7c1.4,0.5,3,0.8,4.4,0.8c7.2,0,13.1-5.9,13.1-13.1S65.2,26.2,58,26.2z"
          fill="#D27D2D"
        />
        <path
          d="M50.8,51c0,6.1-4.9,11-11,11s-11-4.9-11-11c0-4.3,2.5-8,6-9.8"
          fill="#8C542C"
        />
        <path
          d="M45.2,54.2c-2.9,0-5.2-2.3-5.2-5.2s2.3-5.2,5.2-5.2s5.2,2.3,5.2,5.2S48.1,54.2,45.2,54.2z"
          fill="#3A2D27"
        />
        <path
          d="M42.4,58.8c1.8,0.8,3.9,0.8,5.7,0"
          strokeLinecap="round"
        />
      </g>
      <g fill="#3A2D27">
        <circle cx="31.8" cy="36" r="3" />
        <circle cx="50.8" cy="36" r="3" />
        <path d="M28.8,31c1-2,3-3,5-3s4,1,5,3" stroke="#3A2D27" strokeWidth="3" strokeLinecap="round" />
        <path d="M47.8,31c1-2,3-3,5-3s4,1,5,3" stroke="#3A2D27" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
