const NoticeItem = ({
                      notice,
                      onNoticeClick,
                      formatDate
                    }) => {
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