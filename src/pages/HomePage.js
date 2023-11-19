import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Home from '../components/Home/Header'
import SubscriptionSection from '../components/Home/SubscriptionSection';
import Card from '../components/Home/Card';
import Footer from '../components/Home/Footer';

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

const HomePage = () => {
    useEffect(() => {
        document.title = "Spoticry";
    }, []);

    return (
        <div>
            <GlobalStyle />
            <Home />
            <SubscriptionSection />
            <Card />
            <Footer />
        </div>
    );
};

export default HomePage;
