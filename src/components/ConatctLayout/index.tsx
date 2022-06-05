import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./style.scss";

interface IPropTypes {
  children?: ReactNode;
}

function ConatctLayout({ children }: IPropTypes) {
  return (
    <div className="contact-layout">
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default ConatctLayout;
