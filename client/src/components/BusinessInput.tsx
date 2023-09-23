import styled from "styled-components";
import Select, { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import {
  useAddBusinessExpenseMutation,
  useGetBusinessQuery,
} from "./utils/reduxtollkitquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  outline: 1px solid gainsboro;
  padding: 5px;
  width: 50%;

  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`;
const Form = styled.form`
  /* flex: 1; */
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
`;
const Item = styled.div`
  width: 100%;
`;
const Input = styled.input`
  width: 98%;
  height: 40px;
  font-size: 15px;
`;
const Btn = styled.button`
  height: 40px;
  max-width: 100px;
  align-self: center;
`;

type BusinessOptions = {
  value: string | number | undefined;
  label: string;
};

const BusinessInput = () => {
  const [income, setincome] = useState("");
  const [expense, setexpense] = useState("");
  const [date, setdate] = useState("");
  const [business, setbusiness] = useState<BusinessOptions>({
    value: "",
    label: "",
  });
  const [options, setoptions] = useState<BusinessOptions[]>([
    {
      value: "",
      label: "",
    },
  ]);

  // submit expenses and income mutation
  const [
    AddBusinessExpense,
    {
      isLoading: expenseLoading,
      isSuccess: expenseSubmited,
      error: expenseError,
    },
  ] = useAddBusinessExpenseMutation();

  // get the busineses foselect option
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
  // confirm if any data is submited sucessfuly

  useEffect(() => {
    if (expenseLoading) {
      toast("submiting..");
    }
    if (expenseSubmited) {
      toast("Data added sucessfuly");
    }
    if (expenseError) {
      toast("Error, Try again");
    }
  }, [expenseLoading, expenseSubmited, expenseError]);

  const selectBusiness = (options: SingleValue<BusinessOptions>) => {
    if (options?.label && options?.value) {
      setbusiness(options);
    }
  };

  const addSendtoDb = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      business_id: business.value,
      income: Number(income),
      expense: Number(expense),
      date,
    };
    await AddBusinessExpense(body);
  };

  return (
    <Container>
      <ToastContainer />
      <h3>Enter income and Expenses</h3>
      <Form onSubmit={addSendtoDb}>
        <Item>
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="business"
            options={options}
            onChange={selectBusiness}
          />
        </Item>
        <Item>
          <Input
            onChange={(e) => {
              setincome(e.target.value);
            }}
            type="number"
            placeholder="Income"
            required
          />
        </Item>

        <Item>
          <Input
            onChange={(e) => {
              setexpense(e.target.value);
            }}
            type="number"
            placeholder="Expense"
            required
          />
        </Item>

        <Item>
          <Input
            onChange={(e) => {
              setdate(e.target.value);
            }}
            type="date"
            placeholder="Input Date"
            required
          />
        </Item>

        <Btn type="submit"> Add</Btn>
      </Form>
    </Container>
  );
};

export default BusinessInput;
