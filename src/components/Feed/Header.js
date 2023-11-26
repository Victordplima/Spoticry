import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';  // Importa NavLink do react-router-dom
import btnMenu from '../../assets/btnMenu.png';
import searchIcon from '../../assets/lupa.png';
import logo from '../../assets/logo.png';
import user from '../../assets/user.jpg';
import Sidebar from './Sidebar';

const HeaderContainer = styled.header`
  background-color: #000000;
  color: #fff;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #292929; 
  height: 80px;
`;

const MenuButton = styled.div`
  background-image: url(${btnMenu});
  background-size: cover;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

// Use NavLink para tornar o logo um link
const Logo = styled(NavLink)`
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  margin-left: 30px;
  width: 50px;
  height: 40px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 8px 30px 8px 10px;
  border: none;
  border-radius: 20px;
  background-color: #080808;
  color: #4d4d4d;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 95% center;
  background-size: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  border-radius: 50%;
  height: 30px;
  margin-left: 10px;
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HeaderContainer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MenuButton onClick={toggleSidebar} />
          {/* Use o NavLink aqui para fazer o logo um link */}
          <Logo to="/feed" />
        </div>
        <SearchContainer>
          <SearchInput type="text" placeholder="Pesquisa" />
        </SearchContainer>
        <UserInfo>
          <UserImage src={user} alt="Usuário" />
        </UserInfo>
      </HeaderContainer>
      <Sidebar isOpen={isOpen} />
    </>
  );
};

export default Header;
