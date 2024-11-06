import NoticeItem from './NoticeItem.jsx';

const NoticeList = ({
                      notices,
                      onNoticeClick,
                      formatDate
                    }) => {
  return (
    <div className="table-container">
      <table className="notice-table">
        <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>등록일</th>
        </tr>
        </thead>
        <tbody>
        {notices.length > 0 ? (
          notices.map((notice) => (
            <NoticeItem
              key={notice.boardId}
              notice={notice}
              onNoticeClick={onNoticeClick}
              formatDate={formatDate}
            />
          ))
        ) : (
          <tr>
            <td colSpan="3" className="empty-message">
              공지사항이 존재하지 않습니다.
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeList;