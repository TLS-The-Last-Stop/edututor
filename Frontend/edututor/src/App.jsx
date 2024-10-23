import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/common/Loading.jsx';
import AdminLayout from './Layout/AdminLayout.jsx';


const GlobalStyle = createGlobalStyle`
    ${reset}
    html, body {
        height: 100%;
    }
`;

const AdminHome = lazy(() => import('./pages/admin/AdminHome.jsx'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const Home = lazy(() => import('./pages/main/Home.jsx'));
const MainLayout = lazy(() => import('./Layout/MainLayout.jsx'));
const UserLogin = lazy(() => import('./pages/user/UserLogin.jsx'));
const UserJoin = lazy(() => import('./pages/user/UserJoin.jsx'));
const CourseCreationPage = lazy(() => import('./pages/admin/CourseCreationPage.jsx'));
const CourseListPage = lazy(() => import('./pages/admin/CourseCreationPage.jsx'));

const LoadingSpinner = () => <Loading />;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {/* 어드민 route 시작 */}
        <Route path="/admin" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          </Suspense>
        }>

          <Route index element={<AdminHome />} />

          <Route path="login" element={
            <Suspense fallback={<LoadingSpinner />}><AdminLogin /></Suspense>
          } />

          <Route path="course" element={
            <Suspense fallback={<LoadingSpinner />}><CourseListPage /></Suspense>
          } />

          <Route path="create-course" element={
            <Suspense fallback={<LoadingSpinner />}><CourseCreationPage /></Suspense>
          } />
        </Route>
        {/* 어드민 route 끝 */}

        {/* 유저 시작 */}
        <Route path="/" element={
          <Suspense fallback={<LoadingSpinner />}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Suspense>
        }>

          <Route index element={
            <Suspense fallback={<LoadingSpinner />}><Home /></Suspense>
          } />
        </Route>

        <Route path="/login" index element={
          <Suspense fallback={<LoadingSpinner />}><UserLogin /></Suspense>
        } />

        <Route path="/join" index element={
          <Suspense fallback={<LoadingSpinner />}><UserJoin /></Suspense>
        } />
        {/* 유저 끝 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
