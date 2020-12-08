import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";

import { fetchProfit } from "../utils/api";
import TableReport from "../components/Table";
import Header from "../components/Header";

function Home() {
  const [bankFee, setBankFee] = useState<string>("2.9");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(null);
  const [error, setError] = useState<boolean>(null);

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
      return <Spinner animation="grow" />;
    }
    if (error) {
      return (
        <Alert key="error" variant="danger">
          Error while getting the data {error}
        </Alert>
      );
    }

    return <TableReport rows={rows} />;
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
        <Header />

        <Row>
          <Col>
            <Form.Control
              type="text"
              value={bankFee}
              onChange={(e) => setBankFee(e.target.value)}
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
