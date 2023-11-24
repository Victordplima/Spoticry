import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import setaVoltar from '../assets/btnVoltar.png';
import axios from 'axios';
import loadingGif from '../assets/loading.gif';
import loginBackground from '../assets/loginBackground.jpg'
import showPasswordOn from '../assets/showPasswordOn.png'
import showPasswordOff from '../assets/showPasswordOff.png'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
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

const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden; /* Adicionado para evitar a barra de rolagem vertical */
`;

const Background = styled.div`
  flex: 1;
  width: 100%;
  height: 100%; /* Alteração para ocupar toda a altura da tela */
  background-image: url(${loginBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: rotateHue 10s infinite;

  @keyframes rotateHue {
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;

const AuthContainer = styled.div`
  flex: 1;
  max-width: 400px;
  width: 70%;
  margin: auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(3, 125, 250, 0.8);
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
  margin-bottom: 4px; /* Diminui o espaçamento inferior para ficar mais próximo do input */
  color: #fff;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
  background-color: transparent;
  outline: none;
  color: #fff;
`;

const PasswordContainer = styled.div`
  position: relative;
  margin-bottom: 16px; /* Aumenta o espaçamento inferior para separar do próximo input */
`;

const PasswordInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  width: calc(100% - 30px);
  background-color: transparent;
  outline: none;
  color: #fff;
`;

const TogglePassword = styled.span`
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex; /* Para centralizar a imagem verticalmente */
  align-items: center;
  padding-bottom: 19px;
  border-bottom: 1px solid #ccc;
`;

const EyeIcon = styled.img`
  width: 20px; /* Tamanho desejado para os ícones dos olhos */
  height: auto;
  margin-left: 5px; /* Espaçamento entre o ícone e o texto */
`;

const SubmitButton = styled.button`
  background-color: #037dfa;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 18px;
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
  width: 24px;
  height: 24px;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  margin-top: 20px;
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

const RememberMeCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  input[type="checkbox"] {
    margin: 0;
    margin-right: 10px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const LoadingContainer = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url(${loadingGif});
  background-size: cover;
`;

const ForgotPasswordText = styled.div`
  padding-top: 10px;
  color: #777;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
`;

const LoginPage = ({ title, buttonText, linkText, linkTo }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
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

    const handleToggleRememberMe = () => {
        setRememberMe((prevState) => !prevState);
    };

    const handleTogglePassword = () => {
        setFormData((prevData) => ({
            ...prevData,
            showPassword: !prevData.showPassword,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setErrorMessage('');

            const response = await axios.post(
                'https://mqjnto3qw2.execute-api.us-east-1.amazonaws.com/default/user/login',
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            localStorage.setItem('token', response.data.token);
            console.log('Token:', response.data.token);
            console.log('Login bem sucedido:', response.data);

            navigate('/feed');
        } catch (error) {
            setIsLoading(false);

            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
            }
        }
    };

    return (
        <>
            <GlobalStyle />
            <LoginPageContainer>
                <Background />
                <AuthContainer>
                    <BackArrow to="/">
                        <img src={setaVoltar} alt="Seta Voltar" style={{ width: '100%', height: '100%' }} />
                    </BackArrow>
                    <Title>Login</Title>
                    <Form onSubmit={handleLogin}>
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
                                {formData.showPassword ? (
                                    <EyeIcon src={showPasswordOn} alt="Mostrar Senha" />
                                ) : (
                                    <EyeIcon src={showPasswordOff} alt="Esconder Senha" />
                                )}
                            </TogglePassword>
                        </PasswordContainer>
                        <RememberMeCheckbox>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={handleToggleRememberMe}
                            />
                            <label htmlFor="rememberMe">Permanecer Logado</label>
                        </RememberMeCheckbox>
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        <SubmitButton type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingContainer /> : 'Logar'}
                        </SubmitButton>
                    </Form>
                    <ForgotPasswordText> Esqueci minha senha </ForgotPasswordText>
                    <Separator>
                        <Line />
                        <OrText>OU</OrText>
                        <Line />
                    </Separator>
                    <RegisterLink to="/register">Ainda não é usuário? Registrar-se</RegisterLink>
                </AuthContainer>
            </LoginPageContainer>
        </>
    );
};

export default LoginPage;
