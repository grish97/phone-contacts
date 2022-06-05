import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";

interface IPropTypes {
  children?: ReactNode;
}

function Layout({ children }: IPropTypes) {
  return (
    <div className="app-layout">
      <Outlet />
    </div>
  );
}

export default Layout;
