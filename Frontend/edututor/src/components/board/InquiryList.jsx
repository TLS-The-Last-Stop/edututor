import InquiryItem from './InquiryItem.jsx';

const InquiryList = ({
                       inquirys,
                       onInquiryClick,
                       formatDate
                     }) => {
  return (
    <div className="table-container">
      <table className="notice-table">
        <thead>
        <tr>
          <th>상태</th>
          <th>제목</th>
          <th>등록일</th>
        </tr>
        </thead>
        <tbody>
        {inquirys.length > 0 ? (
          inquirys.map((inquiry) => (
            <InquiryItem
              key={inquiry.boardId}
              inquiry={inquiry}
              onInquiryClick={onInquiryClick}
              formatDate={formatDate}
            />
          ))
        ) : (
          <tr>
            <td colSpan="3" className="empty-message">
              문의사항이 존재하지 않습니다.
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryList;