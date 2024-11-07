import { useState } from 'react';

const FaqItem = ({ board }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      <div
        className={`faq-question ${isOpen ? 'active' : ''}`}
        onClick={toggleAnswer}
      >
        {board.title}
        <div className="arrow">{isOpen ? '⋁' : '⋀'}</div>
      </div>
      <div
        className={`faq-answer ${isOpen ? 'open' : ''}`}
        style={{
          maxHeight: isOpen ? '500px' : '0',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {board.content}
      </div>
    </div>
  );
};
export default FaqItem;