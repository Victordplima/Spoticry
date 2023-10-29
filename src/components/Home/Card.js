import React from 'react';
import styled from 'styled-components';
import individual from '../../assets/iconIndividual.png'
import familia from '../../assets/iconFamilia.png'
import estudante from '../../assets/iconEstudante.png'

const CardContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #212121;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  max-width: 300px;
  margin: 20px;
`;

const Icon = styled.img`
  max-width: 50px;
  margin-bottom: 10px;
  height: 32px;
  width: 32px;
  margin-right: 10px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtext = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #037dfa;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = () => {
    return (
        <CardsContainer>
            <CardContainer>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px',  }}>
                    <Icon src={individual} alt="Ícone Induvidual" />
                    <Title>Individual</Title>
                </div>
                <Price>R$ 21,90/mês</Price>
                <Subtext>Ganhe um mês sem custo</Subtext>
                <Subtext>Plano individual. Funciona somente em uma conta</Subtext>
                <Button>Assinar</Button>
            </CardContainer>
            <CardContainer>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Icon src={familia} alt="Ícone Família" />
                    <Title>Família</Title>
                </div>
                <Price>R$ 33,90/mês</Price>
                <Subtext>Ganhe um mês sem custo</Subtext>
                <Subtext>Adicione até cinco membros da família (maiores de 13 anos) que moram na mesma casa.</Subtext>
                <Button>Assinar</Button>
            </CardContainer>
            <CardContainer>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Icon src={estudante} alt="Ícone Estudante" />
                    <Title>Estudante</Title>
                </div>
                <Price>R$ 9,90/mês</Price>
                <Subtext>Ganhe um mês sem custo</Subtext>
                <Subtext>Somente para estudantes qualificados. Verificação anual obrigatória.</Subtext>
                <Button>Assinar</Button>
            </CardContainer>
        </CardsContainer>
    );
};

export default Card;
