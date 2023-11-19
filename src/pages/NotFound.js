import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const ErrorMessage = styled.h1`
  //font-size: 64px;
  color: red;
  margin-bottom: 10px;
`;

const NotFoundMessage = styled.p`
  //font-size: 24px;
  margin-bottom: 20px;
`;

const HomeButton = styled(Link)`
  padding: 10px 20px;
  background-color: #037dfa;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #000000;
    color: #fff;
  }
`;

const NotFound = () => {
    return (
        <NotFoundWrapper>
            <GlobalStyle />
            <ErrorMessage>Erro 404</ErrorMessage>
            <NotFoundMessage>Página não encontrada</NotFoundMessage>
            <HomeButton to="/">Home</HomeButton>
        </NotFoundWrapper>
    );
};

export default NotFound;
