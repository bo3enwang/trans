import React from "react";

interface ShuffleIconProps {
  className?: string;
}

const ShuffleIcon: React.FC<ShuffleIconProps> = ({ ...props }) => {
  return (
    <svg
      height="512px"
      viewBox="0 0 512 512"
      width="512px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M370.1 181.3H399v47.3l81-83.2L399 64v54h-28.9c-82.7 0-129.4 61.9-170.6 116.5-37 49.1-69 95.4-120.6 95.4H32v63.3h46.9c82.7 0 129.4-65.8 170.6-120.4 37-49.1 68.9-91.5 120.6-91.5zm-216.9 36.2c3.5-4.6 7.1-9.3 10.7-14.1 8.8-11.6 18-23.9 28-36.1-29.6-27.9-65.3-48.5-113-48.5H32v63.3s13.3-.6 46.9 0c32.5.7 52.9 14.1 74.3 35.4zM399 330.4h-28.9c-31.5 0-55.7-15.8-78.2-39.3-2.2 3-4.5 6-6.8 9-9.9 13.1-20.5 27.2-32.2 41.1 30.4 29.9 67.2 52.5 117.2 52.5H399V448l81-81.4-81-83.2v47z" />
    </svg>
  );
};

export default ShuffleIcon;
