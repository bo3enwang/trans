import React from "react";

interface TypeScriptIconProps {}

const TypeScriptIcon: React.FC<TypeScriptIconProps> = ({}) => {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 8v-.167c0-.736-.597-1.333-1.333-1.333H10a1.5 1.5 0 100 3h1a1.5 1.5 0 010 3h-1A1.5 1.5 0 018.5 11M8 6.5H3m2.5 0V13M.5.5h14v14H.5V.5z"
        stroke="#000"
      />
    </svg>
  );
};

export default TypeScriptIcon;
