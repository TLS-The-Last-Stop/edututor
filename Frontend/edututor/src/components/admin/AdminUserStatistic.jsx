import { useEffect, useState } from 'react';
import { getStatistics } from '../../api/user/user.js';
import Loading from '../common/Loading.jsx';
import styled from 'styled-components';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const StatsCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const StatCard = styled.div`
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;

    h3 {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 8px;
    }

    p {
        color: #111827;
        font-size: 1.5rem;
        font-weight: 600;
    }
`;

const ChartSection = styled.div`
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: 400px;

    h3 {
        color: #374151;
        font-size: 1.125rem;
        margin-bottom: 16px;
    }
`;

const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    > div {
        height: 350px;
    }
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const initStats = {
  totalUsers          : 0,
  totalTeachers       : 0,
  totalStudents       : 0,
  monthlySignups      : [],
  teacherStudentCounts: []
};

const AdminUserStatistic = () => {
  const [stats, setStats] = useState(initStats);

  const yearlyData = stats.signupStats?.yearlySignups || [];
  const monthlyData = stats.signupStats?.monthlySignups || [];
  const dailyData = stats.signupStats?.dailySignups || [];
  const sortedDailyData = [...dailyData].sort((a, b) => {
    // "24-11-08" 형식의 문자열을 Date 객체로 변환하여 비교
    const dateA = new Date('20' + a.date.replace(/-/g, '/'));
    const dateB = new Date('20' + b.date.replace(/-/g, '/'));
    return dateA - dateB;
  });

  const userRatioData = [
    { name: '선생님', value: stats.ratioStats?.teacherCount || 0 },
    { name: '학생', value: stats.ratioStats?.studentCount || 0 }
  ];

  const deletedData = [
    {
      name   : '선생님',
      total  : stats.deletedStats?.teacher?.totalCount || 0,
      deleted: stats.deletedStats?.teacher?.deletedCount || 0,
      rate   : stats.deletedStats?.teacher?.deleteRate || 0
    },
    {
      name   : '학생',
      total  : stats.deletedStats?.student?.totalCount || 0,
      deleted: stats.deletedStats?.student?.deletedCount || 0,
      rate   : stats.deletedStats?.student?.deleteRate || 0
    }
  ];


  const fetchingStatistics = async () => {
    const statistics = await getStatistics();
    setStats(statistics.data);
  };

  useEffect(() => {
    try {
      fetchingStatistics();
    } catch (error) {
      console.error('통계 조회 실패: ', error);
    }
  }, []);

  if (!stats) return <div><Loading /></div>;

  return (
    <Container>
      <StatsCards>
        <StatCard>
          <h3>전체 사용자</h3>
          <p>
            {stats.ratioStats?.totalUsers || 0} / {' '}
            {(stats.deletedStats?.teacher?.deletedCount || 0) +
              (stats.deletedStats?.student?.deletedCount || 0)}
          </p>
          <small>활성 / 탈퇴</small>
        </StatCard>
        <StatCard>
          <h3>선생님</h3>
          <p>
            {stats.ratioStats?.teacherCount || 0} / {' '}
            {stats.deletedStats?.teacher?.deletedCount || 0}
          </p>
          <small>활성 / 탈퇴</small>
        </StatCard>
        <StatCard>
          <h3>학생</h3>
          <p>
            {stats.ratioStats?.studentCount || 0} / {' '}
            {stats.deletedStats?.student?.deletedCount || 0}
          </p>
          <small>활성 / 탈퇴</small>
        </StatCard>
      </StatsCards>

      <ChartGrid>
        {/* 월별 가입자 추이 */}
        <ChartSection>
          <h3>연도별 가입자 추이</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="가입자 수" />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* 월별 가입자 추이 */}
        <ChartSection>
          <h3>월별 가입자 추이</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearMonth" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" name="가입자 수" />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* 일별 가입자 추이 */}
        <ChartSection>
          <h3>최근 30일 가입자 추이</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={sortedDailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#ffc658" name="가입자 수" />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* 사용자 구성 비율 (기존 파이 차트) */}
        <ChartSection>
          <h3>사용자 구성 비율</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={userRatioData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userRatioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartSection>
        
        <BarChart data={deletedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="total" fill="#8884d8" name="전체 회원" />
          <Bar yAxisId="right" dataKey="deleted" fill="#82ca9d" name="탈퇴 회원" />
        </BarChart>

      </ChartGrid>
    </Container>
  );
};

export default AdminUserStatistic;