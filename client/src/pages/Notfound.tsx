// src/components/NotFound.tsx

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 18px;
  text-align: center;
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>404 - Not Found</Title>
      <Description>
        Sorry, the page you are looking for does not exist.
      </Description>
    </Container>
  );
};

export default NotFound;
