const InquiryItem = ({
                       inquiry,
                       onInquiryClick,
                       formatDate
                     }) => {
  return (
    <tr>
      <td className="status-cell">
        <button>답변대기</button>
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
        {formatDate(inquiry.createAt)}
      </td>
    </tr>
  );
};

export default InquiryItem;