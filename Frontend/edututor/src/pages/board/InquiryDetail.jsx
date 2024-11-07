import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBoardsByCategory } from '../../api/board/board.js';
import '../../assets/css/InquiryDetailPage.css';

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

  const handleGoBack = () => {
    navigate('/cmmn/inquiry');
  };

  useEffect(() => {
    fetchInquiryDetail();
  }, [boardId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (!inquiry) {
    return <div className="loading">로딩중...</div>;
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
              <button className="inquiry-status">{inquiry.status} 답변대기</button>
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <div className="inquiry-info">
                <span className="inquiry-writer">{inquiry.writer} 작성자아아아</span>
                <span>문의</span>
              </div>
              <div
                className="inquiry-content"
                dangerouslySetInnerHTML={{ __html: inquiry.content }}
              />
            </td>
          </tr>
          {/*{inquiry.answer && (*/}
          <tr>
            <th>답변</th>
            <td>
              <div className="answer-info">
                <span className="answer-writer">지니어튜터 고객센터</span>
                <span>답변</span>
                <span className="answer-date">
                      답변일: {formatDate(inquiry.answerDate)}
                    </span>
              </div>
              <div
                className="answer-content"
                dangerouslySetInnerHTML={{ __html: inquiry.answer }}
              />
            </td>
          </tr>
          {/*)}*/}
          </tbody>
        </table>

        <div className="inquiry-footer">
          <button className="list-button" onClick={handleGoBack}>
            목록
          </button>
          <button className="delete-button" onClick={() => {
          }}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;