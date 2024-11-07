import React, { useEffect, useState } from 'react';
import { publicApi } from '../../api/axios.js';
import '../../assets/css/IssueListPage.css';

const IssueListPage = () => {
  const [issues, setIssues] = useState([]);  // 초기값을 빈 배열로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // '/api/issues/list'로 수정
        const response = await publicApi.get('/issue/list');

        // response.data.data에 접근하여 리스트를 설정
        const issuesData = Array.isArray(response.data.data) ? response.data.data : [];
        setIssues(issuesData);
        setLoading(false);
      } catch (err) {
        console.error(err);  // 콘솔에 오류 출력
        setError('신고 리스트를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="issue-list-page">
        <h2>신고 리스트</h2>
        <table className="issue-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>문제 ID</th>
            <th>작성자 ID</th>
            <th>내용</th>
            <th>상태</th>
            <th>작성일</th>
          </tr>
          </thead>
          <tbody>
          {issues.length > 0 ? (
              issues.map((issue) => (
                  <tr key={issue.id}>
                    <td>{issue.id}</td>
                    <td>{issue.questionId}</td>
                    <td>{issue.writer}</td>
                    <td>{issue.content}</td>
                    <td>{issue.status}</td>
                    <td>{new Date(issue.createdAt).toLocaleString()}</td>
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
