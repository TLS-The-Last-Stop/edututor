import BoardItem from './BoardItem';

const BoardList = ({
                     categories,
                     faqList,
                     selectedCategory,
                     openFaqId,
                     onCategoryClick,
                     onFaqClick,
                     showCategories
                   }) => {
  return (
    <div className={`${showCategories ? 'flex gap-6' : ''}`}>
      {/* FAQ일 때만 카테고리 메뉴 표시 */}
      {showCategories && (
        <div className="w-48">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`p-3 cursor-pointer rounded-md mb-2 ${
                selectedCategory === category
                  ? 'bg-gray-100 font-medium'
                  : 'hover:bg-gray-50'
              }`}
            >
              {category}
            </div>
          ))}
        </div>
      )}

      {/* 컨텐츠 목록 */}
      <div className="flex-1">
        {showCategories
          ? // FAQ일 때는 카테고리 필터링 적용
          faqList
            .filter(faq => selectedCategory === '전체' || faq.category === selectedCategory)
            .map(faq => (
              <BoardItem
                key={faq.id}
                faq={faq}
                isOpen={openFaqId === faq.id}
                onFaqClick={() => onFaqClick(faq.id)}
              />
            ))
          : // 다른 메뉴는 전체 목록 표시
          faqList.map(faq => (
            <BoardItem
              key={faq.id}
              faq={faq}
              isOpen={openFaqId === faq.id}
              onFaqClick={() => onFaqClick(faq.id)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default BoardList;