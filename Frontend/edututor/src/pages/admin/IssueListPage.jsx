import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicApi } from '../../api/axios.js';
import '../../assets/css/IssueListPage.css';
import Loading from '../../components/common/Loading.jsx';

const IssueListPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await publicApi.get('/issue/list');
        const issuesData = Array.isArray(response.data.data) ? response.data.data : [];
        setIssues(issuesData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('신고 리스트를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return '오류 접수';
      case 1:
        return '처리 완료';
      case 2:
        return '반려';
      default:
        return '알 수 없음';
    }
  };

  if (loading) return <div><Loading /></div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="issue-list-page">
        <h2>신고 리스트</h2>
        <table className="issue-table">
          <thead>
          <tr>
            <th>신고번호</th>
            <th>문제 번호</th>
            <th>내용</th>
            <th>상태</th>
            <th>작성일</th>
            <th>조회</th>
          </tr>
          </thead>
          <tbody>
          {issues.length > 0 ? (
              issues.map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.id}</td>
                    <td>{issue.questionId}</td>
                    <td>{issue.content}</td>
                    <td>{getStatusText(issue.status)}</td>
                    <td>{new Date(issue.createdAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => navigate(`/admin/issue/${issue.id}`)}>조회하기</button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="6">신고된 문제가 없습니다.</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default IssueListPage;
