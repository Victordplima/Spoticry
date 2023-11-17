import React, { useEffect } from 'react';
import styled from 'styled-components';
import btnHome from '../../assets/btnHome.png';
import btnUpgrade from '../../assets/btnUpgrade.png';

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

const Sidebar = ({ isOpen }) => {
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
            <SidebarButton active={true}>
                <ButtonImage src={btnHome} alt="Ícone do Botão" />
                <ButtonText>Início</ButtonText>
            </SidebarButton>
            <SidebarButton active={false}>
                <ButtonImage src={btnUpgrade} alt="Ícone do Botão" />
                <ButtonText>Upgrade</ButtonText>
            </SidebarButton>
        </SidebarContainer>
    );
};

export default Sidebar;
