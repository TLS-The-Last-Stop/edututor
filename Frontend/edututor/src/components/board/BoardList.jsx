import BoardItem from './BoardItem';
import '../../assets/css/BoardPage.css';

const BoardList = ({
                     categories,
                     faqList = [],
                     selectedCategory,
                     openFaqId,
                     onCategoryClick,
                     onFaqClick,
                     showCategories
                   }) => {

  return (
    <div className={`${showCategories ? 'flex gap-6' : ''}`}>
      <div className="flex-1">
        {showCategories
          ? // FAQ일 때는 카테고리 필터링 적용
          (Array.isArray(faqList) ? faqList : [])
            .filter(faq => selectedCategory === '전체' || faq.category === selectedCategory)
            .map(faq => (
              <BoardItem
                key={faq.boardId}
                faq={faq}
                isOpen={openFaqId === faq.boardId}
                onFaqClick={() => onFaqClick(faq.boardId)}
              />
            ))
          : // 다른 메뉴는 전체 목록 표시
          (Array.isArray(faqList) ? faqList : [])?.map(faq => (
            <BoardItem
              key={faq.boardId}
              faq={faq}
              isOpen={openFaqId === faq.boardId}
              onFaqClick={() => onFaqClick(faq.boardId)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default BoardList;