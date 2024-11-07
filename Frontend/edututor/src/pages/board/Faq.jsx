import { useState, useEffect } from 'react';
import Category from '../../components/board/Category.jsx';
import FaqList from '../../components/board/FaqList.jsx';
import { getCategory } from '../../api/board/category.js';
import { getBoardsByCategory } from '../../api/board/board.js';
import '../../assets/css/FaqPage.css';

const Faq = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [boards, setBoards] = useState([]);

  // 카테고리 목록 조회
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategory();
      if (response.data && response.data) {
        const faqCategory = response.data.find(category => category.name == '자주 묻는 질문(FAQ)');
        if (faqCategory) {
          setCategories(faqCategory.children);
        }
      }
    };

    fetchCategories();
  }, []);

  // 게시글 조회
  useEffect(() => {
    const fetchBoards = async () => {
      let response;
      if (selectedCategoryId) {
        response = await getBoardsByCategory(selectedCategoryId, true);
      } else {
        response = await getBoardsByCategory(2, true);
      }
      if (response.data && response.data) {
        setBoards(response.data);
      }
    };

    fetchBoards();
  }, [selectedCategoryId]);

  return (
    <div className="faq-container">
      <Category
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
      />
      <FaqList
        boards={boards}
      />
    </div>
  );
};

export default Faq;