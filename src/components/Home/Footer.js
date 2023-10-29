import React from 'react';
import styled from 'styled-components';
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import twitter from '../../assets/twitter.png'

const FooterContainer = styled.footer`
  font-family: 'Roboto', sans-serif;
  background-color: #212121;
  color: #fff;
  padding: 20px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
`;

const FooterLinkGroup = styled.div`
  flex-basis: 48%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-basis: auto;
  }
`;

const FooterLinkTitle = styled.h4`
  font-size: 22px;
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 8px;
`;

const FooterIcon = styled.img`
  width: 24px;
  margin-right: 10px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterLinks>
                <FooterLinkGroup>
                    <FooterLinkTitle>Links Úteis</FooterLinkTitle>
                    <FooterLink href="#">Sobre Nós</FooterLink>
                    <FooterLink href="#">Contato</FooterLink>
                    <FooterLink href="#">Política de Privacidade</FooterLink>
                    <FooterLink href="#">Termos de Serviço</FooterLink>
                </FooterLinkGroup>
                <FooterLinkGroup>
                    <FooterLinkTitle>Redes Sociais</FooterLinkTitle>
                    <FooterLink href="#"><FooterIcon src={facebook} /> Facebook</FooterLink>
                    <FooterLink href="#"><FooterIcon src={twitter} /> Twitter</FooterLink>
                    <FooterLink href="#"><FooterIcon src={instagram} /> Instagram</FooterLink>
                </FooterLinkGroup>
            </FooterLinks>
        </FooterContainer>
    );
};

export default Footer;
