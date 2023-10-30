import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import setaVoltar from '../assets/btnVoltar.png';

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

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const AuthContainer = styled.div`
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #212121;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  width: calc(100% - 30px);
`;

const TogglePassword = styled.span`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #037dfa;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const RegisterLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  text-align: center;
  display: block;
  margin-top: 20px;
`;

const BackArrow = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  margin-top: 50px;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
`;

const OrText = styled.div`
  margin: 0 10px;
  font-size: 14px;
  color: #ccc;
`;

const AuthPage = ({ title, buttonText, linkText, linkTo }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTogglePassword = () => {
        setFormData((prevData) => ({
            ...prevData,
            showPassword: !prevData.showPassword,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulário enviado:', formData);
    };

    return (
        <>
            <GlobalStyle />
            <CenteredContainer>
                <AuthContainer>
                    <BackArrow to="/">
                        <img src={setaVoltar} alt="Seta Voltar" />
                    </BackArrow>
                    <Title>Login</Title>
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Label htmlFor="password">Senha</Label>
                        <PasswordContainer>
                            <PasswordInput
                                type={formData.showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <TogglePassword onClick={handleTogglePassword}>
                                {formData.showPassword ? '👁️' : '👁️‍🗨️'}
                            </TogglePassword>
                        </PasswordContainer>
                        <SubmitButton type="submit">Logar</SubmitButton>
                    </Form>
                    <Separator>
                        <Line />
                        <OrText>OU</OrText>
                        <Line />
                    </Separator>
                    <RegisterLink to="/register">Ainda não é usuário? Registrar-se</RegisterLink>
                </AuthContainer>
            </CenteredContainer>
        </>
    );
};

export default AuthPage;
