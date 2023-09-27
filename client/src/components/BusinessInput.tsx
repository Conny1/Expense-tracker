import styled from "styled-components";
import Select, { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { useAddBusinessExpenseMutation } from "./utils/reduxtollkitquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BusinessOptions } from "../pages/Dashboard";
import { mobile } from "./utils/Responsive";
const Container = styled.div`
  outline: 1px solid gainsboro;
  padding: 5px;
  width: 50%;
  /* outline: 1px solid red; */
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
  ${mobile({ width: "auto", flex: 1 })};
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

type Props = {
  options: BusinessOptions[];
};

const BusinessInput = ({ options }: Props) => {
  const [income, setincome] = useState("");
  const [expense, setexpense] = useState("");
  const [date, setdate] = useState("");
  const [business, setbusiness] = useState<BusinessOptions>({
    value: "",
    label: "",
  });

  // submit expenses and income mutation
  const [
    AddBusinessExpense,
    {
      isLoading: expenseLoading,
      isSuccess: expenseSubmited,
      error: expenseError,
    },
  ] = useAddBusinessExpenseMutation();

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

    if (!business.value || !income || !expense || !date) {
      return toast("Input all requred infromation");
    }
    const body = {
      business_id: business.value,
      income: Number(income),
      expense: Number(expense),
      transaction_date: date,
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
