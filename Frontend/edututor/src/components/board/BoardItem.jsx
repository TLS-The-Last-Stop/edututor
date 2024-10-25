const BoardItem = ({ faq, isOpen, onFaqClick }) => {
  return (
    <div style={{ marginBottom: '10px', border: '1px solid #ddd' }}>
      <div
        onClick={onFaqClick}
        style={{
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: '#f5f5f5'
        }}
      >
        {faq.title}
      </div>
      {isOpen && (
        <div style={{ padding: '10px' }}>
          {faq.content}
        </div>
      )}
    </div>
  );
};

export default BoardItem;
