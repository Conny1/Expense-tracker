import Addbusiness from "../components/Addbusiness";
import Select, { SingleValue } from "react-select";
import BusinessInput from "../components/BusinessInput";
import BusinessTable from "../components/BusinessTable";

import Nav from "../components/Nav";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import {
  useDailyExpenseIncomeMutation,
  useGetBusinessQuery,
  useMonthlyExpenseIncomeMutation,
  useWeeklyExpenseIncomeMutation,
} from "../components/utils/reduxtollkitquery";
import Monthly from "../components/Monthly";
import Weekly from "../components/Weekly";
import Linechart from "../components/Linechart";
import { mobile } from "../components/utils/Responsive";
const Container = styled.div`
  outline: 1px solid yellow;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  margin-bottom: 30px;
`;
const Section = styled.div`
  width: 100%;
  /* outline: 1px solid red; */
  display: flex;

  background-color: #646cff;
  padding-top: 2px;
`;
// const Btn = styled.button`
//   height: 40px;
// `;

const BodyContainer = styled.div`
  width: 90%;
  display: flex;
  gap: 10px;
  ${mobile({ flexDirection: "column" })};
`;
const Values = styled.div`
  flex: 1;
  max-height: 70vh;
  overflow: scroll;
`;
const Item = styled.div`
  width: 100%;
  ${mobile({ minHeight: "150px" })};
`;

const Analysis = styled.div`
  margin-top: 30px;
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  ${mobile({ flexDirection: "column" })};
`;

const Charts = styled.div`
  margin-top: 30px;
  flex: 1;
  height: 400px;
  ${mobile({ width: "100%", flex: "none" })};
`;

const TableGroup = styled.div`
  flex: 1;
`;

export type BusinessOptions = {
  value: string | number | undefined;
  label: string;
};

const Dashboard = () => {
  const [options, setoptions] = useState<BusinessOptions[]>([
    {
      value: "",
      label: "",
    },
  ]);

  // RTQ mutation fro geting data based on business_id

  const [
    dailyExpenseIncome,
    {
      data: incomeExpensedata,
      isLoading: incomeExpenseLoading,
      error: expenseincomeError,
    },
  ] = useDailyExpenseIncomeMutation();

  // RTQ mutation fro geting monthly data based on business_id
  const [
    MonthlyExpenseIncome,
    { data: monthlyData, isLoading: isMonthlyloading, error: monthlyError },
  ] = useMonthlyExpenseIncomeMutation();

  // RTQ mutation fro geting weekly data based on business_id
  const [
    weeklyExpenseIncome,
    { data: weeklyData, isLoading: isweeklyloading, error: weeklyError },
  ] = useWeeklyExpenseIncomeMutation();

  // select box
  const selectBusiness = (options: SingleValue<BusinessOptions>) => {
    if (options?.label && options?.value) {
      dailyExpenseIncome(options?.value);
      MonthlyExpenseIncome(options?.value);
      weeklyExpenseIncome(options?.value);
    }
  };

  const { data } = useGetBusinessQuery();

  // map data into options and labels
  useEffect(() => {
    const makeOptions = () => {
      const vals = data?.map((item) => {
        return { label: item.business_name, value: item.business_id };
      });

      if (vals) {
        setoptions(vals);
      }
    };

    makeOptions();
  }, [data]);
  return (
    <Container>
      <Nav />
      <Section></Section>
      <Addbusiness />
      <BodyContainer>
        <BusinessInput options={options} />
        <Values>
          <h5>Daily profit and loss per business</h5>
          <Item>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="business"
              options={options}
              onChange={selectBusiness}
            />
          </Item>

          <BusinessTable
            incomeExpensedata={incomeExpensedata}
            incomeExpenseLoading={incomeExpenseLoading}
            expenseincomeError={expenseincomeError}
          />
        </Values>
      </BodyContainer>

      <Analysis>
        <Charts>
          <h3>Visualization of total mothly loss and profits per year</h3>
          <Linechart
            monthlyData={monthlyData}
            isMonthlyloading={isMonthlyloading}
            monthlyError={monthlyError}
          />
        </Charts>
        <TableGroup>
          <Monthly
            monthlyData={monthlyData}
            isMonthlyloading={isMonthlyloading}
            monthlyError={monthlyError}
          />
          <Weekly
            weeklyData={weeklyData}
            isweeklyloading={isweeklyloading}
            weeklyError={weeklyError}
          />
        </TableGroup>
      </Analysis>
    </Container>
  );
};

export default Dashboard;
