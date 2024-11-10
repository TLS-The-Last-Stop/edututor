import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicApi } from '../../api/axios.js';
import '../../assets/css/IssueDetailPage.css';
import Loading from '../../components/common/Loading.jsx';

const IssueDetailPage = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const response = await publicApi.get(`/issue/details/${issueId}`);
        setIssue(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('신고 상세 정보를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };


    fetchIssueDetails();
  }, [issueId]);

  const handleUpdateStatus = async (status) => {
    try {
      await publicApi.put('/issue/update-status', { issueId, status, reason });
      alert('신고 상태가 업데이트되었습니다.');
      navigate('/admin/issue-list');
    } catch (err) {
      console.error(err);
      setError('신고 상태 업데이트 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div><Loading /></div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="issue-detail-page">
        <h2>신고 상세 정보</h2>
        <table className="issue-detail-table">
          <tbody>
          <tr>
            <th>신고번호</th>
            <td>{issue.issueId}</td>
          </tr>
          <tr>
            <th>문제 내용</th>
            <td>{issue.questionContent}</td>
          </tr>
          <tr>
            <th>옵션</th>
            <td>
              <ul>
                {issue.options.map((option) => (
                    <li key={option.id}>{option.content}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>신고 내용</th>
            <td>{issue.content}</td>
          </tr>
          <tr>
            <th>상태</th>
            <td>{issue.status === 0 ? '오류 접수' : '처리 완료'}</td>
          </tr>
          <tr>
            <th>처리/반려 사유</th>
            <td>
              <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="사유를 입력하세요"
              />
            </td>
          </tr>
          </tbody>
        </table>
        <div className="button-group">
          <button onClick={() => handleUpdateStatus(1)}>처리 완료</button>
          <button onClick={() => handleUpdateStatus(0)}>반려</button>
        </div>
      </div>
  );
};

export default IssueDetailPage;
