const StudentQuestionStatus = ({ userTestResponses }) => {
  return (
    <div className="report-section">
      <h2 className="section-title">학생·문제별 현황</h2>
      <table className="status-table">
        <thead>
        <tr>
          <th>학생</th>
          <th>문제 1</th>
          <th>문제 2</th>
          <th>문제 3</th>
          <th>성취도</th>
        </tr>
        </thead>
        <tbody>
        {userTestResponses?.map((response, index) => (
          <tr key={index}>
            <td>{response.userName}</td>
            {response.userAnswers.map((answer, idx) => (
              <td key={idx}>
                  <span className={`answer-cell ${
                    answer === response.correctAnswers[idx] ? 'correct' : 'incorrect'
                  }`}>
                    {answer}
                  </span>
              </td>
            ))}
            <td>
              <div className="achievement-bar">
                <div
                  className="achievement-fill"
                  style={{ width: `${response.achievementRate}%` }}
                />
              </div>
              {response.achievementRate}%
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
export default StudentQuestionStatus;