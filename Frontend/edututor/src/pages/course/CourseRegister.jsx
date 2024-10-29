import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { publicApi } from '../../api/axios.js';

const TabContent = styled.section`
    margin: 10px 10px 10px 100px;
    padding: 30px 20px;
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    max-width: 1500px;
    width: 100%;
    background: khaki;
    height: 200px;
`;

const TabButton = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 20px;
    font-weight: 500;
    position: relative;
    padding-right: 20px;

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background: #721313;
    }

    ${props => props.isActive && `
      color:#007aff;
    `}
`;

const CourseRegister = () => {
  const [activeTab, setActiveTab] = useState('elementary');
  const [courseDetails, setCourseDetails] = useState([]);
  const [selectedCode, setSelectedCode] = useState('KO');

  const fetchCourseDetails = async (codeId) => {
    try {
      const response = await publicApi.get(`/course/${codeId}`);
      setCourseDetails(response.data);
    } catch (err) {
      console.error('에러욤', err);
    }
  };

  useEffect(() => {
    fetchCourseDetails(selectedCode);
  }, [selectedCode]);

  const handleCodeChange = (codeId) => {
    setSelectedCode(codeId);
  };

  return (
    <>
      <TabButton
        isActive={activeTab === 'elementary'}
        onClick={() => setActiveTab('elementary')}
      >초등</TabButton>
      <TabButton
        isActive={activeTab === 'middle'}
        onClick={() => setActiveTab('middle')}
      >중등</TabButton>
      <TabButton
        isActive={activeTab === 'high'}
        onClick={() => setActiveTab('high')}
      >고등</TabButton>

      <TabContent>
        {activeTab === 'elementary' && (
          <div>
            <select
              value={selectedCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="border rounded p-2"
            >
              <option value="EN">영어</option>
              <option value="KO">국어</option>
            </select>
            <div className="grid gap-4">{Array.isArray(courseDetails) && courseDetails.length > 0 ? (
              courseDetails.map((detail, index) => (
                <div key={index} className="border rounded p-4 bg-white shadow-sm">
                  <div className="font-medium">코드 값: {detail.codeDetailValue}</div>
                  <div className="text-gray-600"><p>ID: {detail.id}</p></div>
                </div>
              ))
            ) : (
              <div>결과가 없습니다.</div>
            )}

            </div>
          </div>
        )}
        {activeTab === 'middle' && (
          <div>
            중등 내용
          </div>
        )}
        {activeTab === 'high' && (
          <div>
            고등 내용
          </div>
        )}
      </TabContent>

    </>

  );
};

export default CourseRegister;