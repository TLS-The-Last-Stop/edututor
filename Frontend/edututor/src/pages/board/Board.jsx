import { useState } from 'react';
import BoardList from '../../components/board/BoardList';
import '../../assets/css/BoardPage.css';

const Board = () => {
  const [selectedMainMenu, setSelectedMainMenu] = useState('자주묻는질문');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [openFaqId, setOpenFaqId] = useState(null);

  const mainMenus = ['공지사항', '자주묻는질문', '1:1 문의'];
  const faqCategories = ['전체', '클래스 운영', '서비스 이용'];

  const contentList = {
    '공지사항': [
      {
        id: 1,
        title: '[공지] 서비스 이용 안내',
        content: '서비스 이용 안내 내용...'
      },
      {
        id: 2,
        title: '[업데이트] 새로운 기능 안내',
        content: '업데이트 내용...'
      }
    ],
    '자주묻는질문': [
      {
        id: 1,
        category: '클래스 운영',
        title: '[클래스 운영] 학생 계정은 어떻게 생성하나요?',
        content: '학생 계정 생성 방법에 대한 답변...'
      },
      {
        id: 2,
        category: '서비스 이용',
        title: '[서비스 이용] 코스웨이는 어떤 기준으로 설정되어 있나요?',
        content: '지니어튜터의 코스웨이는 크게 2가지 기준으로 나뉩니다.'
      }
    ],
    '1:1 문의': [
      {
        id: 1,
        title: '[문의] 비밀번호를 잊어버렸어요',
        content: '비밀번호 재설정 방법 안내...'
      },
      {
        id: 2,
        title: '[문의] 결제 관련 문의드립니다',
        content: '결제 관련 답변...'
      }
    ]
  };

  // FAQ 목록 필터링
  const getFilteredFaqList = () => {
    const currentList = contentList[selectedMainMenu];
    if (selectedMainMenu !== '자주묻는질문' || selectedCategory === '전체') {
      return currentList;
    }
    return currentList.filter(item => item.category === selectedCategory);
  };

  const handleMainMenuClick = (menu) => {
    setSelectedMainMenu(menu);
    setSelectedCategory('전체');
    setOpenFaqId(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setOpenFaqId(null);
  };

  const handleFaqClick = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

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
        faqList={getFilteredFaqList()}
        openFaqId={openFaqId}
        onFaqClick={handleFaqClick}
        showCategories={false}
      />
    </div>
  );
};

export default Board;