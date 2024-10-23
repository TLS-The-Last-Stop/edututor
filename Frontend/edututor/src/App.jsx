import MainLayout from './Layout/MainLayout.jsx';
import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseCreationPage from "./pages/admin/CourseCreationPage.jsx";
import CourseListPage from "./pages/admin/CourseListPage.jsx";

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
        <Routes>
          <Route path="/course" element={<CourseListPage />} />
          <Route path="/create-course" element={<CourseCreationPage />} />
          <Route
              path="*"
              element={
                <MainLayout>
                  <Routes>
                  </Routes>
                </MainLayout>
              }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
