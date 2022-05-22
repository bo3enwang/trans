import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children?: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header></Header>
      <main className="flex-auto flex flex-col">{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
