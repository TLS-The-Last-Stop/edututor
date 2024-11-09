import SharedTestItem from './SharedTestItem';

const SharedTestList = ({ tests = [], onViewDetail }) => {
  return (
      <table className="shared-test-table">
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
        {tests.length > 0 ? (
            tests.map((test) => (
                <SharedTestItem
                    key={test.id}
                    test={test}
                    onViewDetail={onViewDetail}
                />
            ))
        ) : (
            <tr>
              <td colSpan="6" className="empty-message">
                공유받은 시험이 존재하지 않습니다.
              </td>
            </tr>
        )}
        </tbody>
      </table>
  );
};

export default SharedTestList;
