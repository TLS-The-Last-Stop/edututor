import { useState, useEffect } from 'react';
import BoardList from '../../components/board/BoardList';
import { getBoardsByCategory } from '../../api/board/board.js';
import '../../assets/css/BoardPage.css';

const Board = () => {
  const [selectedMainMenu, setSelectedMainMenu] = useState('자주묻는질문');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [boardData, setBoardData] = useState(false);

  const menuCategoryMap = {
    '공지사항': 1,
    '자주묻는질문': 2,
    '1:1 문의': 3
  };

  // FAQ 카테고리와 ID 매핑
  const faqCategoryMap = {
    '전체': 2,
    '클래스 운영': 4,
    '서비스 이용': 5
  };

  const mainMenus = ['공지사항', '자주묻는질문', '1:1 문의'];
  const faqCategories = ['전체', '클래스 운영', '서비스 이용'];

  // 게시글 데이터 조회
  const fetchBoardData = async (categoryId, includeChildren = false) => {
    console.log('요청 시작:', categoryId, includeChildren);
    const response = await getBoardsByCategory(categoryId, includeChildren);

    if (response && response.data) {
      setBoardData(response.data);
    } else {
      setBoardData([]);
    }
  };

  // 메인 메뉴 클릭 핸들러
  const handleMainMenuClick = async (menu) => {
    setSelectedMainMenu(menu);
    setSelectedCategory('전체');
    setOpenFaqId(null);

    const categoryId = menuCategoryMap[menu];
    console.log('선택된 메뉴:', menu, '카테고리ID:', categoryId);

    const includeChildren = menu === '자주묻는질문';
    await fetchBoardData(categoryId, includeChildren);
  };

  // FAQ 카테고리 클릭 핸들러
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setOpenFaqId(null);

    const categoryId = faqCategoryMap[category];
    if (category === '전체') {
      await fetchBoardData(menuCategoryMap['자주묻는질문'], true);
    } else {
      await fetchBoardData(categoryId);
    }
  };

  const handleFaqClick = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  useEffect(() => {
    handleMainMenuClick(selectedMainMenu);
  }, []);

  return (
    <div className="board-container">
      {/* 네비게이션 */}
      <div className="navigation-path">
        <span>홈</span>
        <span className="separator">&gt;</span>
        <span>고객센터</span>
        <span className="separator">&gt;</span>
        <span>{selectedMainMenu}</span>
        {selectedMainMenu === '자주묻는질문' && (
          <>
            <span className="separator">&gt;</span>
            <span>{selectedCategory}</span>
          </>
        )}
      </div>

      {/* 메인 메뉴 */}
      <div className="main-menu">
        {mainMenus.map((menu) => (
          <div
            key={menu}
            onClick={() => handleMainMenuClick(menu)}
            className={`menu-item ${selectedMainMenu === menu ? 'selected' : ''}`}
          >
            {menu}
          </div>
        ))}
      </div>

      {/* FAQ 카테고리 */}
      {selectedMainMenu === '자주묻는질문' && (
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
      )}
      {/* TODO 관리자일 경우에만 보이도록 */}
      <div className="menu-category-container">
        <button className="post-button">등록</button>
      </div>

      {/* 컨텐츠 목록 */}
      <BoardList
        faqList={boardData}
        openFaqId={openFaqId}
        onFaqClick={handleFaqClick}
        showCategories={selectedMainMenu === '자주묻는질문'}
      />
    </div>
  );
};

export default Board;