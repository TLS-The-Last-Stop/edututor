import { useEffect, useState } from 'react';
import { getStatistics } from '../../api/user/user.js';
import Loading from '../common/Loading.jsx';
import styled from 'styled-components';
import {
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

  const userRatioData = [
    { name: '선생님', value: stats.totalTeachers },
    { name: '학생', value: stats.totalStudents }
  ];

  if (!stats) return <div><Loading /></div>;

  return (
    <Container>
      <StatsCards>
        <StatCard>
          <h3>전체 사용자</h3>
          <p>{stats.totalUsers}</p>
        </StatCard>
        <StatCard>
          <h3>선생님</h3>
          <p>{stats.totalTeachers}</p>
        </StatCard>
        <StatCard>
          <h3>학생</h3>
          <p>{stats.totalStudents}</p>
        </StatCard>
      </StatsCards>

      <ChartGrid>
        {/* 월별 가입자 추이 */}
        <ChartSection>
          <h3>월별 가입자 추이</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={stats.monthlySignups.map(item => ({
              ...item,
              count: item.count - 1
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearMonth" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                name="가입자 수"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>

        {/* 선생님/학생 비율 */}
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

      </ChartGrid>
    </Container>
  );
};

export default AdminUserStatistic;