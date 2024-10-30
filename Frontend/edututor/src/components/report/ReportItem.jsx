const ReportItem = ({
                      report,
                      onViewDetail
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
      <td>{formatDate(report.createAt)}</td>
      <td>{report.courseName}</td>
      <td>{report.unitName}</td>
      <td className="text-center">
        {report.participationCount}/{report.totalCount}
      </td>
      <td>
        <div className="achievement-wrapper">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${report.achievementRate}%` }}
            />
          </div>
          <span className="achievement-text">{report.achievementRate}%</span>
        </div>
      </td>
      <td className="text-center">
        <button
          onClick={() => onViewDetail(report.id)}
          className="detail-button"
        >
          보기
        </button>
      </td>
    </tr>
  );
};

export default ReportItem;