import React, { useEffect } from 'react';
import styled from 'styled-components';
import btnHome from '../../assets/btnHome.png';
import btnUpgrade from '../../assets/btnUpgrade.png';
import btnGerenciador from '../../assets/btnGerenciador.png';
import { NavLink, useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #000000;
  position: fixed;
  top: 81px;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  transition: left 0.3s ease;
  border-right: 1px solid #292929;
  z-index: 4;
`;

const SidebarButton = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 15px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#555' : 'transparent')};
  border-radius: 8px;
  margin: 10px 10px;

  &:hover {
    background-color: #555;
  }
`;

const ButtonImage = styled.img`
  justify-content: left;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-left: 10px;
`;

const ButtonText = styled.span`
  text-align: center;
  font-weight: bold;
`;

const NavLinkButton = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <SidebarContainer isOpen={isOpen}>
      <NavLinkButton to="/feed" className={location.pathname === '/feed' ? 'active' : ''}>
        <SidebarButton active={location.pathname === '/feed'}>
          <ButtonImage src={btnHome} alt="Ícone do Botão" />
          <ButtonText>Início</ButtonText>
        </SidebarButton>
      </NavLinkButton>
      <NavLinkButton to="/manage-music" className={location.pathname === '/manage-music' ? 'active' : ''}>
        <SidebarButton active={location.pathname === '/manage-music'}>
          <ButtonImage src={btnGerenciador} alt="Ícone do Botão" />
          <ButtonText>Gerenciar músicas</ButtonText>
        </SidebarButton>
      </NavLinkButton>
      <NavLinkButton to="/" className={location.pathname === '/' ? 'active' : ''}>
        <SidebarButton active={location.pathname === '/'}>
          <ButtonImage src={btnUpgrade} alt="Ícone do Botão" />
          <ButtonText>Upgrade</ButtonText>
        </SidebarButton>
      </NavLinkButton>
    </SidebarContainer>
  );
};

export default Sidebar;
