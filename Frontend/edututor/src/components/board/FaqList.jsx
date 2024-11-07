import FaqItem from './FaqItem.jsx';

const FaqList = ({ boards }) => {
  return (
    <div className="faq-list">
      <div className="faq-items">
        {boards.map(board => (
          <FaqItem key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default FaqList;