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
          notice.number
        )}
      </td>
      <td className="title-cell">
        <button
          onClick={() => onNoticeClick(notice.id)}
          className="title-button"
        >
          {notice.title}
        </button>
      </td>
      <td className="date-cell">
        {formatDate(notice.createdAt)}
      </td>
    </tr>
  );
};

export default NoticeItem;