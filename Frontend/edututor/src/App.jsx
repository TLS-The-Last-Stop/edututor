import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from './components/common/Loading.jsx';
import AdminLayout from './Layout/AdminLayout.jsx';
import MaterialCreationPage from './pages/admin/MaterialCreationPage.jsx';
import TestPaperCreationPage from './pages/admin/TestPaperCreationPage.jsx';
import CourseDetailPage from './pages/admin/CourseDetailPage.jsx';
import Board from './pages/board/Board.jsx';
import TestPaperDetailPage from './pages/admin/TestPaperDetailPage.jsx';
import MaterialDetailPage from './pages/admin/MaterialDetailPage.jsx';
import MaterialEditPage from './pages/admin/MaterialEditPage.jsx';
import CourseEditPage from './pages/admin/CourseEditPage.jsx';
import CoursePage from './pages/course/CoursePage.jsx';
import ExamPage from './pages/exam/ExamPage.jsx';
import CourseClassroomEnrollPage from './pages/course/CourseClassroomEnrollPage.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import Report from './pages/report/Report.jsx';
import ReportDetail from './pages/report/ReportDetail.jsx';
import { AuthProvider, useAuth } from './utils/AuthContext.jsx';
import CourseStudentPage from './pages/course/CourseStudentPage.jsx';
import MaterialDetailStudentPage from './pages/material/MaterialDetailStudentPage.jsx';


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
const Classroom = lazy(() => import('./pages/classroom/Classroom.jsx'));
const ExamShare = lazy(() => import('./pages/exam/ExamSharePage.jsx'));

const LoadingSpinner = () => <Loading />;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/admin" element={ // AD(admin)권한만
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

          <Route path="course/edit/:courseId" element={
            <Suspense fallback={<LoadingSpinner />}><CourseEditPage /></Suspense>
          } />

          <Route path="create-material" element={
            <Suspense fallback={<LoadingSpinner />}><MaterialCreationPage /></Suspense>
          } />

          <Route path="create-test-paper" element={
            <Suspense fallback={<LoadingSpinner />}><TestPaperCreationPage /></Suspense>
          } />

          <Route path="materials/:materialId" element={
            <Suspense fallback={<LoadingSpinner />}><MaterialDetailPage /></Suspense>
          } />

          <Route path="edit-material/:materialId" element={
            <Suspense fallback={<LoadingSpinner />}><MaterialEditPage /></Suspense>
          } />
        </Route>

        <Route path="/" element={ // 기본적으로 아무나
          <Suspense fallback={<LoadingSpinner />}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Suspense>
        }>

          <Route index element={ // 아무나인데 로그인, 권한에 따라 다르게 분리 (Home 컴포넌트 > 메인섹션 컴포넌트 안에서)
            <Suspense fallback={<LoadingSpinner />}><Home /></Suspense>
          } />

          <Route path="cmmn" element={ // 아무나, 로그인, 권한에 따라 버튼만 수정
            <Suspense fallback={<LoadingSpinner />}><Board /></Suspense>
          } />

          <Route path="report" element={ // SU(학생), TE(선생)만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <Report />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="report/:testPaperId" element={ // SU(학생), TE(선생)만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <ReportDetail />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="classroom" element={ // TE(선생)만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="TE">
                <Classroom />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="exam-share" element={ // TE(선생)만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="TE">
                <ExamShare />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/student/test/:testPaperId" element={ // TE, SU만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <ExamPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/student/material/:materialId" element={// TE, SU만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <MaterialDetailStudentPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/course/:courseId" index element={ // TE만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="TE">
                <CoursePage />
              </ProtectedRoute>
            </Suspense>
          } />
          <Route path="/course0/:courseId" index element={ // TE, SU만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <CourseStudentPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/course/enroll" index element={ // TE만
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="TE">
                <CourseClassroomEnrollPage />
              </ProtectedRoute>
            </Suspense>
          } />
        </Route>

        <Route path="/login" element={ // 모두 가능
          <Suspense fallback={<LoadingSpinner />}><UserLogin /></Suspense>
        } />

        <Route path="/join" element={ // 모두 가능
          <Suspense fallback={<LoadingSpinner />}><UserJoin /></Suspense>
        } />

        <Route path="/teacher-login" element={ // 접근은 모두 가능
          <Suspense fallback={<LoadingSpinner />}><TeacherLogin /></Suspense>
        } />

        <Route path="/student-login" element={ // 접근 모두 가능
          <Suspense fallback={<LoadingSpinner />}><StudentLogin /></Suspense>
        } />

      </Routes>
    </>
  );
}

export default App;
