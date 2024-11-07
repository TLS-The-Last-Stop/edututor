import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/InquiryForm.css';

const InquiryForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 로직 구현
    console.log({ title, content });
  };

  const handleCencleClick = () => {
    navigate(`/cmmn/inquiry`);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">
            문의 제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            문의 내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="문의 내용을 입력해주세요."
            className="form-textarea"
          />
        </div>

        <div className="button-group">
          <button
            type="button"
            className="register-button"
            onClick={handleCencleClick}
          >
            작성 취소
          </button>
          <button
            type="submit"
            className="submit-button"
          >
            동의 및 문의 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;