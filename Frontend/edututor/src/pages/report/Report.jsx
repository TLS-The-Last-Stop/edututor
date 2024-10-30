import { useState, useEffect } from 'react';
import ReportList from '../../components/report/ReportList.jsx';
import { getReportByTestPaperId } from '../../api/report/report.js';
import '../../assets/css/ReportPage.css';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);

  const fetchReportData = async () => {
    const response = await getReportByTestPaperId();
    if (response.data) {
      setReportData(response.data);
    } else {
      setReportData([]);
    }
  };

  const handleViewDetail = (reportId) => {
    setSelectedReportId(reportId);
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  return (
    <div className="report-container">
      <ReportList
        reports={reportData}
        selectedReportId={selectedReportId}
        onViewDetail={handleViewDetail}
      />
    </div>
  );
};

export default Report;