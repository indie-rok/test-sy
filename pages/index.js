import { useState } from "react";
import Table from "../components/Table/index.tsx";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

export default function Home() {
  const [bankFee, setBankFee] = useState("2.9");

  const getProfit = () => {
    console.log(bankFee);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Profit calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
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

        <Row>
          <Col>
            <Form.Control
              type="text"
              value={bankFee}
              onChange={(e) => {
                setBankFee(e.target.value);
              }}
            />
          </Col>

          <Col>
            <Button onClick={getProfit}>Get profit</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
