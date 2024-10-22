import MainLayout from './Layout/MainLayout.jsx';
import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
    ${reset}
    html, body {
        height: 100%;
    }
`;


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
