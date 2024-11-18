import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBoardsByCategory } from '../../api/board/board.js';
import '../../assets/css/NoticeDetailPage.css';
import Loading from '../../components/common/Loading.jsx';

const NoticeDetail = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);

  const fetchNoticeDetail = async () => {
    const response = await getBoardsByCategory(1, false);
    if (response && response.data) {
      const selectNotice = response.data.find(
        (item) => item.boardId === parseInt(boardId)
      );
      setNotice(selectNotice);
    }
  };

  const handleGoBack = () => {
    navigate('/cmmn/notice');
  };

  useEffect(() => {
    fetchNoticeDetail();
  }, [boardId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year : 'numeric',
      month: '2-digit',
      day  : '2-digit'
    });
  };

  if (!notice) {
    return <div className="loading"><Loading /></div>;
  }
  ;

  return (
    <div className="notice-detail-container">
      <div className="navigation-path">
        <span>홈</span>
        <span className="separator">&gt;</span>
        <span>고객센터</span>
        <span className="separator">&gt;</span>
        <span>공지사항</span>
        <span className="separator">&gt;</span>
        <span>상세보기</span>
      </div>

      <div className="notice-detail-content">
        <div className="notice-header">
          <h1 className="notice-title">{notice.title}</h1>
          <div className="notice-info">
            <span className="notice-date">등록일: {formatDate(notice.createdAt)}</span>
          </div>
        </div>

        <div className="notice-body">
          <div
            className="notice-content"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />
        </div>

        <div className="notice-footer">
          <button
            className="back-button"
            onClick={handleGoBack}
          >
            목록
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;