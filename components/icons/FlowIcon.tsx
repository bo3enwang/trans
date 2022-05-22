import React from "react";

interface FlowIconProps {
  className?: string;
}

const FlowIcon: React.FC<FlowIconProps> = ({ className = "h-5 w-5" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 498.39 252.33"
      width="1em"
      height="1em"
    >
      <g className="prefix__flow-logo-mark">
        <path fill="#ffca20" opacity={0.7} d="m224.74 109-84.11-84.1h84.11z" />
        <path
          fill="#ffca20"
          opacity={0.7}
          d="M81.72 0h47.68l36.44 36.43H81.72z"
        />
        <path
          fill="#ffcf39"
          opacity={0.9}
          d="M84.45 84.12.34 0h101.13v84.11zm73.89 84.1 84.11 84.11h-84.11z"
        />
        <path
          fill="#ffe490"
          opacity={0.7}
          d="m101.47 168.23-84.1-84.12h84.11v84.11zm90.58-42.57L125 58.57h67.08zm7.84 118.84-76.28-76.27h76.28z"
        />
        <path fill="#fcbc7c" opacity={0.9} d="m101.47 67-67-67h67z" />
        <path
          fill="#f9a040"
          opacity={0.8}
          d="m123.95 168.22 84.11 84.11h-84.11z"
        />
        <path fill="#f9a040" opacity={0.7} d="m209.08 201.8-84-84h84z" />
        <path fill="#ffcf39" opacity={0.9} d="m125 58.57 83.09 83.09H125z" />
        <path
          fill="#ffc737"
          opacity={0.7}
          d="M101.47 252 0 150.51h101.47V252z"
        />
      </g>
      <path
        className="prefix__flow-logo-text"
        fill="#eee"
        d="M311.18 108.38h19.55v4.78h-19.55v50.77h-5.55v-50.77h-11.12v-4.78h11.11v-9.33q0-7.78 4.33-12.28t12.22-4.5q6 0 9 3l-1.56 4.44a10.21 10.21 0 0 0-7-2.44q-5.44 0-8.44 3.17t-3 9.17zm31.11 42.1q0 5.11 1.61 7.22t5.39 2.11a15.55 15.55 0 0 0 7.33-1.56l-.78 5.33a17.29 17.29 0 0 1-7.33 1.44q-6 0-8.89-3.39T336.73 151V82.83h5.55zM405.78 115q7.05 7.72 7.06 21.17t-7.05 21.16q-7.07 7.67-19.38 7.67T367 157.32q-7-7.72-7-21.16t7-21.16q7.05-7.7 19.41-7.7t19.37 7.7zm-34.71 3.5q-5.55 6.44-5.55 17.66t5.55 17.66q5.55 6.44 15.33 6.44t15.33-6.44q5.55-6.44 5.55-17.66t-5.55-17.66q-5.56-6.5-15.34-6.5t-15.34 6.46zm127.33-10.09-19 55.55h-5.58l-17.55-48.55-17.11 48.55h-5.56l-19-55.55h6.22l15.55 49 17.33-49h5.58l17.2 49 15.69-49z"
      />
    </svg>
  );
};

export default FlowIcon;
