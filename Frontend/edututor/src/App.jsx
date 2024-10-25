import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/common/Loading.jsx';
import AdminLayout from './Layout/AdminLayout.jsx';
import MaterialCreationPage from './pages/admin/MaterialCreationPage.jsx';
import TestPaperCreationPage from './pages/admin/TestPaperCreationPage.jsx';
import CourseDetailPage from './pages/admin/CourseDetailPage.jsx';
import CourseRegister from './pages/course/CourseRegister.jsx';
import Board from './pages/board/Board.jsx';
import TestPaperDetailPage from './pages/admin/TestPaperDetailPage.jsx';


const GlobalStyle = createGlobalStyle`
    ${reset}
    html, body {
        height: 100%;
    }
`;
/* 관리자 라우팅 */
const AdminHome = lazy(() => import('./pages/admin/AdminHome.jsx'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const CourseCreationPage = lazy(() => import('./pages/admin/CourseCreationPage.jsx'));
const CourseListPage = lazy(() => import('./pages/admin/CourseListPage.jsx'));

/* 유저 라우팅 */
const Home = lazy(() => import('./pages/main/Home.jsx'));
const MainLayout = lazy(() => import('./Layout/MainLayout.jsx'));
const UserJoin = lazy(() => import('./pages/user/UserJoin.jsx'));
const UserLogin = lazy(() => import('./pages/user/UserLogin.jsx'));
const TeacherLogin = lazy(() => import('./pages/user/TeacherLogin.jsx'));
const StudentLogin = lazy(() => import('./pages/user/StudentLogin.jsx'));

const LoadingSpinner = () => <Loading />;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
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

          <Route path="course-detail/:courseId" element={
            <Suspense fallback={<LoadingSpinner />}><CourseDetailPage /></Suspense>
          } />
          <Route path="test-paper-detail/:testPaperId" element={
            <Suspense fallback={<LoadingSpinner />}><TestPaperDetailPage /></Suspense>
          } />
          <Route path="create-course" element={
            <Suspense fallback={<LoadingSpinner />}><CourseCreationPage /></Suspense>
          } />

          <Route path="create-material" element={
            <Suspense fallback={<LoadingSpinner />}><MaterialCreationPage /></Suspense>
          } />

          <Route path="create-test-paper" element={
            <Suspense fallback={<LoadingSpinner />}><TestPaperCreationPage /></Suspense>
          } />
        </Route>

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

          <Route path="cmmn" element={
            <Suspense fallback={<LoadingSpinner />}><Board /></Suspense>
          } />
        </Route>

        <Route path="/login" element={
          <Suspense fallback={<LoadingSpinner />}><UserLogin /></Suspense>
        } />

        <Route path="/join" element={
          <Suspense fallback={<LoadingSpinner />}><UserJoin /></Suspense>
        } />

        <Route path="/teacher-login" element={
          <Suspense fallback={<LoadingSpinner />}><TeacherLogin /></Suspense>
        } />

        <Route path="/student-login" element={
          <Suspense fallback={<LoadingSpinner />}><StudentLogin /></Suspense>
        } />

        <Route path="courseregister" element={<CourseRegister />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
