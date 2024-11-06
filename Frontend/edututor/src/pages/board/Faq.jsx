import { useState, useEffect } from 'react';
import BoardList from '../../components/board/BoardList';
import { getBoardsByCategory } from '../../api/board/board.js';
import '../../assets/css/FaqPage.css';

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [boardData, setBoardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategoryMap = {
    '전체': 2,
    '클래스 운영': 5,
    '코스웨어/문항': 6
  };

  const faqCategories = ['전체', '클래스 운영', '코스웨어/문항'];

  const fetchBoardData = async (categoryId) => {
    const response = await getBoardsByCategory(categoryId, true, searchQuery);
    setBoardData(response && response.data ? response.data : []);
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setOpenFaqId(null);
    setSearchQuery('');
    const categoryId = faqCategoryMap[category];
    await fetchBoardData(categoryId);
  };

  const handleFaqClick = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  useEffect(() => {
    fetchBoardData(faqCategoryMap['전체']);
  }, []);

  return (
    <div className="faq-container">
      <div className="category-menu">
        {faqCategories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
          >
            {category}
          </div>
        ))}
      </div>

      <BoardList
        faqList={boardData}
        openFaqId={openFaqId}
        onFaqClick={handleFaqClick}
        showCategories />
    </div>
  );
};

export default Faq;