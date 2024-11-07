import { useState, useEffect } from 'react';
import InquiryList from '../../components/board/InquiryList.jsx';
import { getBoardsByCategory } from '../../api/board/board.js';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/NoticePage.css';
import Pagination from '../../components/common/Pagination.jsx';

const Inquiry = () => {
  const [inquiryData, setInquiryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchInquiryData = async () => {
    const response = await getBoardsByCategory(3, false, searchQuery);

    if (response && response.data) {
      setInquiryData(response.data);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } else {
      setInquiryData([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchInquiryData();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleInquiryClick = (boardId) => {
    navigate(`/cmmn/inquiry/${boardId}`);
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    fetchInquiryData(page);
  };

  const handleInquiryButtonClick = () => {
    navigate(`/cmmn/inquiry/inquiry-form`);
  };

  useEffect(() => {
    fetchInquiryData();
  }, []);

  return (
    <div className="board-container">
      <div className="navigation-path">
        <span>홈</span>
        <span className="separator">&gt;</span>
        <span>고객센터</span>
        <span className="separator">&gt;</span>
        <span>1:1 문의</span>
      </div>

      <div>
        <span>1:1 문의</span>
        <button type="submit" className="inquiry-submit" onClick={handleInquiryButtonClick}>문의하기</button>
      </div>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력해주세요"
          />
          <button type="submit">검색</button>
        </form>
      </div>

      <InquiryList
        inquirys={inquiryData}
        onInquiryClick={handleInquiryClick}
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

export default Inquiry;