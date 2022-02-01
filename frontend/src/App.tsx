
import React from 'react';

import { ContractContext } from './context';

import { styled } from '@mui/system';
import { Header } from './components/header';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { TodoLogic } from './components/todoLogic';

const theme = createTheme({
  palette: {
    primary: {
      main:"#63458A"
    }
  }
})

const App:React.FC = () =>  {
  
  return (
    <ContractContext>
      <ThemeProvider theme={theme}>
        <Wrapper>
            <>
              <Header/>
              <Container>
              {window.ethereum && window.ethereum.isMetaMask ?
                <TodoWrapper>
                  <TodoLogic/>
                </TodoWrapper>
                : <MetaMaskMessage>
                    <Typography>To use app you have to have Metamask, please 
                      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer"> install it </a>
                    </Typography>
                  </MetaMaskMessage>
              }
              </Container>
            </>
        </Wrapper>
      </ThemeProvider>
    </ContractContext>
  );
}
const Wrapper = styled("div")({
  minHeight: "100vh",
	display: "flex",
	flexDirection: "column",
	position: "relative",
});
const Container = styled("div")({
	maxWidth: "1430px",
	padding: "0 15px",
})
const TodoWrapper = styled("div")({
  marginTop:"40px"
})
const MetaMaskMessage = styled("div")({
    display: "flex",
    alignItems:'center',
    marginTop:"20px",
    justifyContent:"center"
})
export default App;
