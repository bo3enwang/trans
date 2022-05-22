import React from "react";

interface BigQueryIconProps {
  className?: string;
}

const BigQueryIcon: React.FC<BigQueryIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={className}
    >
      <defs>
        <style>
          {
            ".prefix__cls-1,.prefix__cls-2{fill:#aecbfa;fill-rule:evenodd}.prefix__cls-2{fill:#669df6}"
          }
        </style>
      </defs>
      <g data-name="Product Icons">
        <path
          className="prefix__cls-1"
          d="M6.73 10.83v2.63a4.91 4.91 0 0 0 1.71 1.74v-4.37Z"
        />
        <path
          className="prefix__cls-2"
          d="M9.89 8.41v7.53A7.62 7.62 0 0 0 11 16a8 8 0 0 0 1 0V8.41Z"
        />
        <path
          className="prefix__cls-1"
          d="M13.64 11.86v3.29a5 5 0 0 0 1.7-1.82v-1.47Z"
        />
        <path
          d="m17.74 16.32-1.42 1.42a.42.42 0 0 0 0 .6l3.54 3.54a.42.42 0 0 0 .59 0l1.43-1.43a.42.42 0 0 0 0-.59l-3.54-3.54a.42.42 0 0 0-.6 0"
          style={{
            fill: "#4285f4",
            fillRule: "evenodd",
          }}
        />
        <path
          className="prefix__cls-2"
          d="M11 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9m0 15.69A6.68 6.68 0 1 1 17.69 11 6.68 6.68 0 0 1 11 17.69"
        />
      </g>
    </svg>
  );
};

export default BigQueryIcon;
