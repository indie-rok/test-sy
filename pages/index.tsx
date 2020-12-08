import { useState } from "react";
import { InferGetStaticPropsType } from "next";

import { serverUrl } from "../config";
import { Row as RowInterface } from "../entities/Row";
import Table from "../components/Table";
import Head from "next/head";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function Home({ rows }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [bankFee, setBankFee] = useState("2.9");

  console.log(rows);

  const getProfit = () => {
    console.log(bankFee);
  };

  return (
    <>
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
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${serverUrl}/reports`);
  const rows: RowInterface[] = await res.json();

  return {
    props: {
      rows,
    },
  };
};

export default Home;
