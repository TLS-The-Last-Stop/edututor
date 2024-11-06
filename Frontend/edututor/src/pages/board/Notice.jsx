import { useState, useEffect } from 'react';
import NoticeList from '../../components/board/NoticeList.jsx';
import { getBoardsByCategory } from '../../api/board/board.js';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/NoticePage.css';
import Pagination from '../../components/common/Pagination.jsx';

const Notice = () => {
  const [noticeData, setNoticeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNoticeData = async () => {
    const response = await getBoardsByCategory(1, false, searchQuery);

    if (response && response.data) {
      setNoticeData(response.data);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } else {
      setNoticeData([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchNoticeData();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleNoticeClick = (id) => {
    navigate(`/cmmn/notice/${id}`);
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    fetchNoticeData(page);
  };

  useEffect(() => {
    fetchNoticeData();
  }, []);

  return (
    <div className="board-container">
      <div className="navigation-path">
        <span>홈</span>
        <span className="separator">&gt;</span>
        <span>고객센터</span>
        <span className="separator">&gt;</span>
        <span>공지사항</span>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <button type="submit">검색</button>
        </form>
      </div>

      <NoticeList
        notices={noticeData}
        onNoticeClick={handleNoticeClick}
        formatDate={formatDate}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

    </div>
  );
};

export default Notice;