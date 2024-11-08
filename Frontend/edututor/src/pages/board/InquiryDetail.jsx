import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { deleteInquiry, getBoardsByCategory } from '../../api/board/board.js';
import '../../assets/css/InquiryDetailPage.css';
import Loading from '../../components/common/Loading.jsx';

const InquiryDetail = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);

  const fetchInquiryDetail = async () => {
    const response = await getBoardsByCategory(3, false);
    if (response && response.data) {
      const selectedInquiry = response.data.find(
        (item) => item.boardId === parseInt(boardId)
      );
      setInquiry(selectedInquiry);
    }
  };

  const handleDelete = async () => {
    if (confirm('문의를 삭제하시겠습니까?')) {
      await deleteInquiry(boardId);
      navigate('/cmmn/inquiry');
    }
  };

  const handleGoBack = () => {
    navigate('/cmmn/inquiry');
  };

  useEffect(() => {
    fetchInquiryDetail();
  }, [boardId]);

  if (!inquiry) {
    return <div className="loading"><Loading /></div>;
  }

  return (
    <div className="inquiry-detail-container">
      <div className="navigation-path">
        <span>홈</span>
        <span className="separator">&gt;</span>
        <span>고객센터</span>
        <span className="separator">&gt;</span>
        <span>1:1 문의</span>
        <span className="separator">&gt;</span>
        <span>상세보기</span>
      </div>

      <div className="inquiry-detail-content">
        <table className="inquiry-table">
          <tbody>
          <tr>
            <th>제목</th>
            <td>{inquiry.title}</td>
          </tr>
          <tr>
            <th>상태</th>
            <td>
              <button className="inquiry-status">
                {inquiry.hasAnswer ? '답변완료' : '답변대기'}
              </button>
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <div className="inquiry-info">
                <span className="inquiry-writer">{inquiry.username}</span>
                <span>문의</span>
              </div>
              <div
                className="inquiry-content"
                dangerouslySetInnerHTML={{ __html: inquiry.content }}
              />
            </td>
          </tr>
          {inquiry.hasAnswer && (
            <tr>
              <th>답변</th>
              <td>
                <div className="answer-info">
                  <span className="answer-writer">지니어튜터 고객센터</span>
                  <span>답변</span>
                </div>
                <div
                  className="answer-content"
                  dangerouslySetInnerHTML={{ __html: inquiry.inquiryAnswer }}
                />
              </td>
            </tr>
          )}
          </tbody>
        </table>

        <div className="inquiry-footer">
          <button className="list-button" onClick={handleGoBack}>
            목록
          </button>
          <button className="delete-button" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;