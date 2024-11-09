import React, { useEffect, useState } from 'react';
import SharedTestList from './SharedTestList';
import './SharedTestList.css';
import {publicApi} from "../../api/axios.js";

const SharedTestListPage = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchSharedTests = async () => {
      const response = await publicApi('/api/report/shared-tests');
      const data = await response.json();
      setTests(data.data.content);
    };

    fetchSharedTests();
  }, []);

  const handleViewDetail = (id) => {
  };

  return (
      <div>
        <h2>공유받은 시험 리스트</h2>
        <SharedTestList tests={tests} onViewDetail={handleViewDetail} />
      </div>
  );
};

export default SharedTestListPage;
