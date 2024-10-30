import React, { useEffect, useState } from 'react';
import StudentQuestionStatus from '../../components/report/StudentQuestionStatus.jsx';
import SummarySection from '../../components/report/SummarySection.jsx';
import { useParams } from 'react-router-dom';
import { getReportDetail } from '../../api/report/report.js';
import '../../assets/css/ReportDetailPage.css';

const ReportDetail = () => {
  const [reportDetailData, setReportDetailData] = useState(null);
  const { testPaperId } = useParams();  // Add this line to get the ID from URL

  const fetchReportDetailData = async (testPaperId) => {
    const response = await getReportDetail(testPaperId);
    if (response.data) {
      setReportDetailData(response.data);
    }
  };

  useEffect(() => {
    if (testPaperId) {
      fetchReportDetailData(testPaperId);
    }
  }, [testPaperId]);

  return (
    <div className="report-detail-container">
      <SummarySection reportData={reportDetailData} />
      <StudentQuestionStatus
        userTestResponses={reportDetailData?.userTestResponse2List}
      />
    </div>
  );
};

export default ReportDetail;