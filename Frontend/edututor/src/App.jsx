import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Loading from './components/common/Loading.jsx';
import AdminLayout from './Layout/AdminLayout.jsx';
import MaterialCreationPage from './pages/admin/MaterialCreationPage.jsx';
import TestPaperCreationPage from './pages/admin/TestPaperCreationPage.jsx';
import CourseDetailPage from './pages/admin/CourseDetailPage.jsx';
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
import { AuthProvider } from './utils/AuthContext.jsx';
import CourseStudentPage from './pages/course/CourseStudentPage.jsx';
import MaterialDetailStudentPage from './pages/material/MaterialDetailStudentPage.jsx';
import Notice from './pages/board/Notice.jsx';
import NoticeDetail from './pages/board/NoticeDetail.jsx';
import Faq from './pages/board/Faq.jsx';
import Inquiry from './pages/board/Inquiry.jsx';
import IssueListPage from "./pages/admin/IssueListPage.jsx";
import InquiryForm from './components/board/InquiryForm.jsx';
import InquiryDetail from './pages/board/InquiryDetail.jsx';


const GlobalStyle = createGlobalStyle`
    ${reset}
    html, body {
        height: 100%;
        font-family: 'Noto Sans KR', sans-serif;
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
const AdditionalInfo = lazy(() => import('./pages/user/AdditionalInfo.jsx'));
const OAuthSuccess = lazy(() => import('./pages/user/OAuthSuccess.jsx'));

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
        <Route path="/admin" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          </Suspense>
        }>

          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <AdminHome />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="login" element={
            <Suspense fallback={<LoadingSpinner />}><AdminLogin /></Suspense>
          } />

          <Route path="course" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <CourseListPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="course-detail/:courseId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <CourseDetailPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="test-paper-detail/:testPaperId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <TestPaperDetailPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="create-course" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <CourseCreationPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="course/edit/:courseId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <CourseEditPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="create-material" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <MaterialCreationPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="create-test-paper" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <TestPaperCreationPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="materials/:materialId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <MaterialDetailPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="edit-material/:materialId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <MaterialEditPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="issue-list" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="AD">
                <IssueListPage />
              </ProtectedRoute>
            </Suspense>
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

          <Route path="cmmn/notice" element={ // 아무나, 로그인, 권한에 따라 버튼만 수정
            <Suspense fallback={<LoadingSpinner />}><Notice /></Suspense>
          } />

          <Route path="cmmn/notice/:boardId" element={ // 아무나, 로그인, 권한에 따라 버튼만 수정
            <Suspense fallback={<LoadingSpinner />}><NoticeDetail /></Suspense>
          } />

          <Route path="cmmn/faq" element={ // 아무나, 로그인, 권한에 따라 버튼만 수정
            <Suspense fallback={<LoadingSpinner />}><Faq /></Suspense>
          } />

          <Route path="cmmn/inquiry" element={ // SU(학생), TE(선생)만
            <Suspense fallback={<LoadingSpinner />}><Inquiry /></Suspense>
          } />

          <Route path="cmmn/inquiry/:boardId" element={ // SU(학생), TE(선생)만
            <Suspense fallback={<LoadingSpinner />}><InquiryDetail /></Suspense>
          } />

          <Route path="cmmn/inquiry/inquiry-form" element={ // SU(학생), TE(선생)만
            <Suspense fallback={<LoadingSpinner />}><InquiryForm /></Suspense>
          } />

          <Route path="report" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <Report />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="report/:testPaperId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <ReportDetail />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="classroom" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="TE">
                <Classroom />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="exam-share" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="TE">
                <ExamShare />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/student/test/:testPaperId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <ExamPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/student/material/:materialId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <MaterialDetailStudentPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/course/:courseId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <CoursePage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/course0/:courseId" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="SU">
                <CourseStudentPage />
              </ProtectedRoute>
            </Suspense>
          } />

          <Route path="/course/enroll" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProtectedRoute requiredRole="TE">
                <CourseClassroomEnrollPage />
              </ProtectedRoute>
            </Suspense>
          } />
        </Route>

        <Route path="/login" element={
          <Suspense fallback={<LoadingSpinner />}><UserLogin /></Suspense>
        } />

        <Route path="/join" element={
          <Suspense fallback={<LoadingSpinner />}><UserJoin /></Suspense>
        } />

        <Route path="/additional-info" element={
          <Suspense fallback={<LoadingSpinner />}><AdditionalInfo /></Suspense>
        } />

        <Route path="/oauth/success" element={
          <Suspense fallback={<LoadingSpinner />}><OAuthSuccess /></Suspense>
        } />

        <Route path="/teacher-login" element={
          <Suspense fallback={<LoadingSpinner />}><TeacherLogin /></Suspense>
        } />

        <Route path="/student-login" element={
          <Suspense fallback={<LoadingSpinner />}><StudentLogin /></Suspense>
        } />

      </Routes>
    </>
  );
}

export default App;
