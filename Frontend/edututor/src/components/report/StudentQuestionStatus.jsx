const StudentQuestionStatus = ({ userTestResponses }) => {
  const questionCount = userTestResponses?.[0]?.questionCount || 0;
  return (
      <div className="report-section">
        <h2 className="section-title">응시 학생별·문제 현황</h2>
        <table className="status-table">
          <thead>
          <tr>
            <th>학생</th>
            {Array.from({ length: questionCount }, (_, i) => (
                <th key={i}>문제 {i + 1}</th>
            ))}
            <th>성취도</th>
          </tr>
          </thead>
          <tbody>
          {userTestResponses?.map((response, index) => (
              <tr key={index}>
                <td>{response.userName}</td>
                {response.userAnswers.map((answer, idx) => (
                    <td key={idx}>
                  <span className={`answer-cell ${response.isCorrect[idx] ? 'correct' : 'incorrect'}`}>
                    {response.isCorrect[idx] ? 'O' : 'X'}
                  </span>
                    </td>
                ))}
                <td>
                  <div className="achievement-bar">
                    <div
                        className="achievement-fill"
                        style={{ width: `${response.achievementRate}%` }}
                    >
                      <div className="achievement-rate">
                        {response.achievementRate}%
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};
export default StudentQuestionStatus;
