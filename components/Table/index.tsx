import React from "react";
import { Table as RBTable } from "react-bootstrap";

import { Row } from "../../entities/Row";

export interface TableProps {
  rows: Row[];
}

const renderRow = ({ range, items, average }: Row) => (
  <tr>
    <td>{range}</td>
    <td>{items}</td>
    <td>{average}</td>
  </tr>
);

export default function Table({ rows }: { rows: Row[] }) {
  return (
    <>
      <RBTable striped bordered hover>
        <thead>
          <tr>
            <th>Ticket cost</th>
            <th>Number of tickets</th>
            <th>Average Profit</th>
          </tr>
        </thead>
        <tbody>{rows.map((row) => renderRow(row))}</tbody>
      </RBTable>
    </>
  );
}
