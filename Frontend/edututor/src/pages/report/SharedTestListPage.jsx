import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedTestList from '../../components/report/SharedTestList.jsx';
import '../../assets/css/SharedTestList.css';
import { publicApi } from "../../api/axios.js";

const SharedTestListPage = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSharedTests = async () => {
      try {
        const response = await publicApi.get('/report/shared-tests');
        setTests(response.data.data.content);
      } catch (error) {
        console.error('Error fetching shared tests:', error);
        setError('시험 리스트를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchSharedTests();
  }, []);

  const handleViewDetail = (userTestId) => {
    if (userTestId) {
      navigate(`/tests/details/${userTestId}`);
    } else {
      console.error("UserTest ID가 없습니다.");
    }
  };

  return (
      <div className="shared-test-page-container">
        <h2>공유받은 시험 리스트</h2>
        {error && <p className="error-message">{error}</p>}
        <SharedTestList tests={tests} onViewDetail={handleViewDetail} />
      </div>
  );
};

export default SharedTestListPage;
