import styled from "styled-components";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { mobile } from "../components/utils/Responsive";
import { useEditIncomeExpenseMutation } from "../components/utils/reduxtollkitquery";
import { useLocation, useNavigate } from "react-router-dom";
const Container = styled.div`
  outline: 1px solid gainsboro;

  width: 100%;
  /* outline: 1px solid red; */
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`;
const Form = styled.form`
  display: flex;
  width: 50%;
  flex-direction: column;
  height: 300px;
  min-height: 300px;
  justify-content: space-between;
  ${mobile({ width: "90%", flex: 1 })};
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

const Update = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  const location = useLocation();
  const stateData = location.state;

  // const dateTime = new Date(stateData.transaction_date)
  //   .toLocaleDateString()
  //   .split("/");

  // const date2 = `${dateTime[2]}-${
  //   dateTime[0].length === 2 ? dateTime[0] : "0" + dateTime[0]
  // }-${dateTime[1].length === 2 ? dateTime[1] : "0" + dateTime[1]}`;

  // console.log(date2);
  const [income, setincome] = useState(stateData.income);
  const [expense, setexpense] = useState(stateData.expense);
  const [desc, setdesc] = useState(stateData?.description || "");
  // const [date, setdate] = useState(date2);

  const [
    editIncomeExpense,
    {
      isLoading: expenseLoading,
      isSuccess: expenseSubmited,
      error: expenseError,
    },
  ] = useEditIncomeExpenseMutation();

  useEffect(() => {
    if (expenseLoading) {
      toast("submiting..");
    }
    if (expenseSubmited) {
      toast("Data Edited sucessfuly");
      navigate("/");
    }
    if (expenseError) {
      toast("Error, Try again");
      if ("status" in expenseError) {
        if (expenseError.status === 401) {
          toast("Your session has expired. Redirecting...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    }
  }, [expenseLoading, expenseSubmited, expenseError, navigate]);

  const updateDb = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!income || !expense) {
      return toast("Input all requred infromation");
    }
    const date = new Date(stateData.transaction_date)
      .toLocaleDateString()
      .split("/");

    const date2 = `${date[2]}-${date[0]}-${date[1]}`;
    const body = {
      business_id: stateData.business_id,
      income: Number(income),
      expense: Number(expense),
      transaction_date: date2,
      description: desc,
    };
    // console.log(body);
    await editIncomeExpense(body);
  };

  return (
    <Container>
      <ToastContainer />
      <h3>Update income and Expenses</h3>
      <Form onSubmit={updateDb}>
        <Item>
          <h3 style={{ textAlign: "center" }}>Edit inputs</h3>
        </Item>
        <Item>
          <Input
            onChange={(e) => {
              setincome(e.target.value);
            }}
            value={income}
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
            value={expense}
            type="number"
            placeholder="Expense"
            required
          />
        </Item>

        <Item>
          <Input
            onChange={(e) => {
              setdesc(e.target.value);
            }}
            value={desc}
            type="text"
            placeholder="description"
          />
        </Item>

        <Btn type="submit"> Edit</Btn>
      </Form>
    </Container>
  );
};

export default Update;
