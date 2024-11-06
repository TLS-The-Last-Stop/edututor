import ReportItem from './ReportItem';

const ReportList = ({
                      reports = [],
                      onViewDetail
                    }) => {
  return (
    <table className="report-table">
      <thead>
      <tr>
        <th>공유일</th>
        <th>단원</th>
        <th>리포트명</th>
        <th>참여 현황</th>
        <th>성취도</th>
        <th>상세</th>
      </tr>
      </thead>
      <tbody>
      {reports.length > 0 ? (
        reports.map((report) => (
          <ReportItem
            key={report.id}
            report={report}
            onViewDetail={onViewDetail}
          />
        ))
      ) : (
        <tr>
          <td colSpan="6" className="empty-message">
            리포트가 존재하지 않습니다.
          </td>
        </tr>
      )}
      </tbody>
    </table>
  );
};

export default ReportList;