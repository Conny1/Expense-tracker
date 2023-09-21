import styled from "styled-components";

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
  return (
    <Container>
      <Form>
        <Input type="text" placeholder="Enter Business Name" />
        <button type="submit"> Add</button>
      </Form>
    </Container>
  );
};

export default Addbusiness;
