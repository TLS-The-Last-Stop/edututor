import { useState } from 'react';
import ExamShareModal from './ExamShareModal.jsx';

const ExamList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(1);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>시험 공유 테스트</button>
      <ExamShareModal setSelectedTest={selectedTest} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ExamList;