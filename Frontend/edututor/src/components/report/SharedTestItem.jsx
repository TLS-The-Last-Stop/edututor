// SharedTestItem.js
const SharedTestItem = ({ test, onViewDetail }) => {
  const { id, testPaperName, unitName, deadline } = test;

  return (
      <tr>
        <td>{deadline ? new Date(deadline).toLocaleDateString() : '미정'}</td>
        <td>{unitName}</td>
        <td>{testPaperName}</td>
        <td>{test.isParticipated ? '응시완료' : '미응시'}</td>
        <td>{test.achievementRate ? `${test.achievementRate}%` : '-'}</td>
        <td>
          <button onClick={() => onViewDetail(id)}>상세보기</button>
        </td>
      </tr>
  );
};

export default SharedTestItem;
