const InquiryItem = ({
                       inquiry,
                       onInquiryClick,
                       formatDate
                     }) => {
  return (
    <tr>
      <td className="status-cell">
        <button
          className={`status-button ${inquiry.hasAnswer ? 'completed' : 'waiting'}`}
        >
          {inquiry.hasAnswer ? '답변완료' : '답변대기'}
        </button>
      </td>
      <td className="title-cell">
        <button
          onClick={() => onInquiryClick(inquiry.boardId)}
          className="title-button"
        >
          {inquiry.title}
        </button>
      </td>
      <td className="date-cell">
        {formatDate(inquiry.createdAt)}
      </td>
    </tr>
  );
};

export default InquiryItem;