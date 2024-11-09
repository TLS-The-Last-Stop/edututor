const SharedTestItem = ({ test, onViewDetail }) => {
  const { id, testPaperName, unitName, deadline, isParticipated, achievementRate } = test;

  return (
      <tr>
        <td>{deadline ? new Date(deadline).toLocaleDateString() : '미정'}</td>
        <td>{unitName}</td>
        <td>{testPaperName}</td>
        <td>{isParticipated ? '참여 완료' : '미참여'}</td>
        <td>{achievementRate ? `${achievementRate}%` : '-'}</td>
        <td>
          <button onClick={() => onViewDetail(id)}>상세보기</button>
        </td>
      </tr>
  );
};

export default SharedTestItem;
