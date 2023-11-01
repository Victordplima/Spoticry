import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #000000;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #292929; 
  height: 80px;
`;

const Logo = styled.div`
  text-align: center;
`;

const LogoImage = styled.img`
  height: 50px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
  border: solid 2px white;
  padding: 10px;
  border-radius: 10px 10px;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <LogoImage src={logo} alt="Logo" />
      </Logo>
      <ButtonsContainer>
        <Button><Link to="/register">Registrar</Link></Button>
        <Button><Link to="/login">Login</Link></Button>
      </ButtonsContainer>
    </HeaderContainer>
  );
};

export default Header;
