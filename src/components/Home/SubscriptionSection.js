import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';

const SectionContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  text-align: center;
  max-width: 1000px;
  margin: auto;
  padding: 20px;
`;

const LogoImage = styled.img`
  margin-top: 32px;
  max-width: 200px;
  margin-bottom: 25px;
`;

const BoldText = styled.div`
  font-weight: bold;
  font-size: 48px;
  margin-bottom: 25px;
`;

const BoldText2 = styled.div`
  font-weight: bold;
  font-size: 48px;
  margin-top: 100px;
`;

const SmallText = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #037dfa;
  color: #fff;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 25px;
`;

const BlueText = styled.span`
  color: #037dfa;
`;

const SubscriptionSection = () => {
    return (
        <SectionContainer>
            <LogoImage src={logo} alt="Logo" />
            <BoldText>
                Assine o <BlueText>Spoticry</BlueText> para aproveitar músicas sem anúncios, off-line e com a tela bloqueada
            </BoldText>
            <SmallText>
                Teste sem custos de 1 mês • Depois R$ 21,90⁠/⁠mês • Cancele a qualquer momento
            </SmallText>
            <Button>Teste Grátis</Button>
            <SmallText>
                Ou economize dinheiro com uma assinatura anual, de estudante ou um plano família
            </SmallText>
            <BoldText2>
                Escolha a sua assinatura
            </BoldText2>
        </SectionContainer>
    );
};

export default SubscriptionSection;
