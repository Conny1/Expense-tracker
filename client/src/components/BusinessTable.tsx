import { styled } from "styled-components";

const Container = styled.table`
  width: 100%;
  border: 1px solid gainsboro;
`;
const TableRow = styled.tr`
  border: 1px solid gainsboro;
`;
const Tablehead = styled.th`
  background-color: #0d6efd;
  color: #fff;
`;
const Tabledata = styled.td`
  border: 1px solid gainsboro;
`;

const BusinessTable = () => {
  return (
    <Container>
      <thead>
        <TableRow>
          <Tablehead>Date</Tablehead>
          <Tablehead>income</Tablehead>
          <Tablehead>Expense</Tablehead>
          <Tablehead>Profit</Tablehead>
          <Tablehead>Loss</Tablehead>
        </TableRow>
      </thead>
      <tbody style={{ backgroundColor: "#a5c7fa", color: "#fff" }}>
        <TableRow>
          <Tabledata>2023-07-22</Tabledata>
          <Tabledata>1000</Tabledata>
          <Tabledata>300</Tabledata>
          <Tabledata>700</Tabledata>
          <Tabledata>0.00</Tabledata>
        </TableRow>

        <TableRow>
          <Tabledata>2023-07-22</Tabledata>
          <Tabledata>1000</Tabledata>
          <Tabledata>300</Tabledata>
          <Tabledata>700</Tabledata>
          <Tabledata>0.00</Tabledata>
        </TableRow>

        <TableRow>
          <Tabledata>2023-07-22</Tabledata>
          <Tabledata>1000</Tabledata>
          <Tabledata>300</Tabledata>
          <Tabledata>700</Tabledata>
          <Tabledata>0.00</Tabledata>
        </TableRow>

        <TableRow>
          <Tabledata>2023-07-22</Tabledata>
          <Tabledata>1000</Tabledata>
          <Tabledata>300</Tabledata>
          <Tabledata>700</Tabledata>
          <Tabledata>0.00</Tabledata>
        </TableRow>

        <TableRow>
          <Tabledata>2023-07-22</Tabledata>
          <Tabledata>1000</Tabledata>
          <Tabledata>300</Tabledata>
          <Tabledata>700</Tabledata>
          <Tabledata>0.00</Tabledata>
        </TableRow>

        <TableRow>
          <Tabledata>2023-07-22</Tabledata>
          <Tabledata>1000</Tabledata>
          <Tabledata>300</Tabledata>
          <Tabledata>700</Tabledata>
          <Tabledata>0.00</Tabledata>
        </TableRow>
      </tbody>
    </Container>
  );
};

export default BusinessTable;
