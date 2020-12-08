import React from "react";
import { Row, Col } from "react-bootstrap";

export default function Header() {
  return (
    <>
      <Row>
        <Col>
          <img
            className="d-block mx-auto mt-2"
            src="https://dummyimage.com/100x50"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-center">Profit calculator</h1>
        </Col>
      </Row>
    </>
  );
}
