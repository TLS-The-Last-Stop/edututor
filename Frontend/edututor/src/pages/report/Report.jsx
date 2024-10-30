import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportList from '../../components/report/ReportList.jsx';
import { getReport } from '../../api/report/report.js';
import '../../assets/css/ReportPage.css';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();

  const fetchReportData = async () => {
    const response = await getReport();
    if (response.data) {
      setReportData(response.data);
    } else {
      setReportData([]);
    }
  };

  const handleViewDetail = (testPaperId) => {
    navigate(`/report/${testPaperId}`);
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  return (
    <div className="report-container">
      <ReportList
        reports={reportData}
        onViewDetail={handleViewDetail}
      />
    </div>
  );
};

export default Report;