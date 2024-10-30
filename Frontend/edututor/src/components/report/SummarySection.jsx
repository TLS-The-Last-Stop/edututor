const SummarySection = ({ reportData }) => {
  return (
    <div className="report-section">
      <h2 className="section-title">종합</h2>
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">내용 영역</div>
          <div className="summary-value">{reportData?.title}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">단원</div>
          <div className="summary-value">{reportData?.sectionName}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">차시</div>
          <div className="summary-value">{reportData?.unitName}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">평균 성취도</div>
          <div className="summary-value">
            {reportData?.userTestResponse2List?.reduce((acc, curr) =>
              acc + curr.achievementRate, 0) / reportData?.userTestResponse2List?.length || 0}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;