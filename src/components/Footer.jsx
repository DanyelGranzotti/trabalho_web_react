import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container className="justify-content-center">
        <Navbar.Text>
          © {new Date().getFullYear()} Gerenciador de Gastos. Todos os direitos
          reservados.
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Footer;
