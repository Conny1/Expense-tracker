import { styled } from "styled-components";
import { useDailyExpenseIncomeQuery } from "./utils/reduxtollkitquery";

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

type Props = {
  businessID: string | number;
};

const BusinessTable = ({ businessID }: Props) => {
  const {
    data: incomeExpensedata,
    isLoading: incomeExpenseLoading,
    error: expenseincomeError,
  } = useDailyExpenseIncomeQuery(businessID);

  if (incomeExpenseLoading) {
    return <>Loading...</>;
  }

  if (expenseincomeError) {
    return <>Error fectingData. Refresh page</>;
  }

  if (!incomeExpensedata?.length) {
    return <>Business data not found !!!</>;
  }

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
      <tbody
        style={{
          backgroundColor: "#a5c7fa",
          color: "#fff",
        }}
      >
        {incomeExpensedata?.map((item, i: number) => {
          const formattedDate = new Date(item.transaction_date);
          return (
            <TableRow key={i}>
              <Tabledata>{formattedDate.toDateString()}</Tabledata>
              <Tabledata>{item.income}</Tabledata>
              <Tabledata>{item.expense}</Tabledata>
              <Tabledata>
                {item.expense < item.income ? item.income - item.expense : "0"}
              </Tabledata>
              <Tabledata>
                {item.expense > item.income ? item.expense - item.income : "0"}
              </Tabledata>
            </TableRow>
          );
        })}
      </tbody>
    </Container>
  );
};
export default BusinessTable;
