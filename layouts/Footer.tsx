import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-screen-xl px-4 py-2 mx-auto space-y-12 sm:px-6 lg:px-8">
        <p className="text-xs text-gray-500">© 2022 Company Name</p>
      </div>
    </footer>
  );
};

export default Footer;
