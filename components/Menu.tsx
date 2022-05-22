import React from "react";

interface MenuProps {
  children?: any;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-2 mx-2 text-sm font-semibold text-indigo-700 cursor-pointer">
      {children}
    </div>
  );
};

export default Menu;
