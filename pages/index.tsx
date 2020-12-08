import { useState, useEffect } from "react";

import { serverUrl } from "../config";
import { Row as RowInterface } from "../entities/Row";
import Table from "../components/Table";
import Head from "next/head";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";

function Home() {
  const [bankFee, setBankFee] = useState<string>("2.9");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(null);
  const [error, setError] = useState<boolean>(null);

  const fetchProfit = async (bankFee) => {
    try {
      const res = await fetch(`${serverUrl}/reports?bank_fee=${bankFee}`);
      const rows = await res.json();
      return rows;
    } catch (err) {
      throw err;
    }
  };

  const getReport = async () => {
    setLoading(true);
    setError(null);

    try {
      setRows(await fetchProfit(bankFee));
    } catch (err) {
      setError(err.toString());
    }

    setLoading(false);
  };

  const renderTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return (
        <Alert key="error" variant="danger">
          Error while getting the data {error}
        </Alert>
      );
    }

    return <Table rows={rows} />;
  };

  useEffect(() => {
    const fetchReport = async () => {
      await getReport();
    };

    fetchReport();
  }, []);

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
            <Button onClick={getReport}>Get profit</Button>
          </Col>
        </Row>

        <Row>
          <Col className="mt-3">{renderTable()}</Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
