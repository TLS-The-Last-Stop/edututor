import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportList from '../../components/report/ReportList.jsx';
import { getReport } from '../../api/report/report.js';
import '../../assets/css/ReportPage.css';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchReportData = async (page) => {
    const response = await getReport(page);
    if (response.success) {
      setReportData(response.data.content);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } else {
      setReportData([]);
    }
  };

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    fetchReportData(page);
  };

  const getQueryPage = () => {
    const params = new URLSearchParams(location.search);
    return Number(params.get('page')) || 0;
  };

  useEffect(() => {
    const page = getQueryPage();
    fetchReportData(page);
  }, [location.search]);

  return (
    <div className="report-container">
      <ReportList
        reports={reportData}
        onViewDetail={(id) => navigate(`/report/${id}`)}
      />
      <div className="pagination">
        <button onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}>
          «
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}>
          ‹
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={index === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}>
          ›
        </button>
        <button onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}>
          »
        </button>
      </div>
    </div>
  );
};

export default Report;