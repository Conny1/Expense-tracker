import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  /* outline: 1px solid red; */
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBar = styled.nav`
  min-height: 80px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  /* max-width: 500px; */
  flex: 1;
  max-width: 800px;
`;
const Btn = styled.button``;

const Nav = () => {
  return (
    <Container>
      <NavBar>
        <Link to="/">Dashboard</Link>
        <Link to="/analysis">Analysis</Link>
        <Link to="/profile">Profile</Link>
        <Btn>Logout</Btn>
      </NavBar>
    </Container>
  );
};

export default Nav;
