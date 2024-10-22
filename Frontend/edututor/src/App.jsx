import './App.css';
import MainLayout from './Layout/MainLayout.jsx';
import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${reset}
    html, body {
        height: 100%;
    }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <MainLayout />
    </>
  );
}

export default App;
