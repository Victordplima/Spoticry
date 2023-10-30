import React from 'react';
import styled from 'styled-components';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import twitter from '../../assets/twitter.png';

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  max-width: 1170px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Footer = styled.footer`
  background-color: #212121;
  padding: 70px 0;
`;

const FooterCol = styled.div`
   width: 25%;
   padding: 0 15px;
`;

const FooterTitle = styled.h4`
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #037dfa;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
  }
`;

const FooterList = styled.ul`
  list-style: none;
`;

const FooterListItem = styled.li`
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    padding-left: 8px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  margin-top: 50px;
`;

const SocialLink = styled.a`
  display: inline-block;
  height: 40px;
  width: 40px;
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
  background-size: cover;
  background-position: center;

  &.facebook {
  background-image: url(${facebook});
  }

  &.twitter {
    background-image: url(${twitter});
  }

  &.instagram {
    background-image: url(${instagram});
  }

  &:hover {
    color: #24262b;
    background-color: #ffffff;
  }
`;

const FooterComponent = () => {
  return (
    <Footer>
      <Container>
        <Row>
          <FooterCol>
            <FooterTitle>Compania</FooterTitle>
            <FooterList>
              <FooterListItem><FooterLink href="#">Sobre nós</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Nossos serviços</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Política de privacidade</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Programa de afiliados</FooterLink></FooterListItem>
            </FooterList>
          </FooterCol>
          <FooterCol>
            <FooterTitle>Ajuda</FooterTitle>
            <FooterList>
              <FooterListItem><FooterLink href="#">FAQ</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Opções de pagamento</FooterLink></FooterListItem>
            </FooterList>
          </FooterCol>
          <FooterCol>
            <FooterTitle>Planos</FooterTitle>
            <FooterList>
              <FooterListItem><FooterLink href="#">Individual</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Família</FooterLink></FooterListItem>
              <FooterListItem><FooterLink href="#">Estudante</FooterLink></FooterListItem>
            </FooterList>
          </FooterCol>
          <FooterCol>
            <FooterTitle>Sociais</FooterTitle>
            <SocialLinks>
              <SocialLink className="facebook"></SocialLink>
              <SocialLink className="twitter"></SocialLink>
              <SocialLink className="instagram"></SocialLink>
            </SocialLinks>
          </FooterCol>
        </Row>
      </Container>
    </Footer>
  );
};

export default FooterComponent;
