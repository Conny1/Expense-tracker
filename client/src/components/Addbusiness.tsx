import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAddBusinessMutation } from "./utils/reduxtollkitquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  /* outline: 1px solid red; */
  width: 400px;
  height: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  flex: 1;
  display: flex;
`;
const Input = styled.input`
  flex: 1;
`;

const Addbusiness = () => {
  const [name, setname] = useState("");

  // add business mutation

  const [AddBusiness, { isLoading, isSuccess }] = useAddBusinessMutation();

  const submitBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name) {
      await AddBusiness({ business_name: name });
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast("submiting..");
    }
    if (isSuccess) {
      toast("Data added sucessfuly");
    }
  }, [isLoading, isSuccess]);
  return (
    <Container>
      <ToastContainer />
      <Form onSubmit={submitBusiness}>
        <Input
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="Enter Business Name"
        />
        <button type="submit"> Add</button>
      </Form>
    </Container>
  );
};

export default Addbusiness;
