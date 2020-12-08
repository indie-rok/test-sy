import React from "react";
import { Table as RBTable } from "react-bootstrap";

import { RowEntity } from "../../entities/Row";

export interface TableProps {
  rows: RowEntity[];
}

const renderRow = ({ range, items, average }: RowEntity) => (
  <tr>
    <td>
      {"<"} {range} $
    </td>
    <td>{items}</td>
    <td>{average} %</td>
  </tr>
);

export default function TableReport({ rows }: { rows: RowEntity[] }) {
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
