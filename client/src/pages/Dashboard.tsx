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
} from "../components/utils/reduxtollkitquery";
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
`;
const Values = styled.div`
  flex: 1;
  max-height: 70vh;
  overflow: scroll;
`;
const Item = styled.div`
  width: 100%;
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

  // select box
  const selectBusiness = (options: SingleValue<BusinessOptions>) => {
    if (options?.label && options?.value) {
      dailyExpenseIncome(options.value);
      console.log(options?.value);
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
    </Container>
  );
};

export default Dashboard;
