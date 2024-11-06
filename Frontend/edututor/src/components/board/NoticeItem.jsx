const NoticeItem = ({
                      notice,
                      onNoticeClick
                    }) => {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <tr>
      <td className="number-cell">
        {notice.fixed ? (
          <span className="fixed-notice">★</span>
        ) : (
          notice.boardId
        )}
      </td>
      <td className="title-cell">
        <button
          onClick={() => onNoticeClick(notice.boardId)}
          className="title-button"
        >
          {notice.title}
        </button>
      </td>
      <td className="date-cell">
        {formatDate(notice.createAt)}
      </td>
    </tr>
  );
};

export default NoticeItem;