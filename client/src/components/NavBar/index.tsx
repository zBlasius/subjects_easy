import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
interface NavbarProps {
  firstColumn: React.ReactElement;
  secondColumn: React.ReactElement;
}

const Navbar: React.FC<NavbarProps> = ({ firstColumn, secondColumn }) => {
  return (
    <Container
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background:"#000000b3",
        zIndex:1
      }}
    >
      <Row
        className="header d-flex align-items-center"
        style={{
          height: "8vh",
          borderBottom: "1px solid #A647E1",
          width: "100%",
        }}
      >
        <Col style={{ display: "flex", color: "#A647E1" }}>{firstColumn}</Col>
        <Col style={{ display: "flex", justifyContent: "end" }}>
          <div style={{ width: "100%" }}>{secondColumn}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
