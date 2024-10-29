import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getAllStudent } from '../../api/classroom/classroom.js';
import { Button } from '../common/UserStyledComponents.js';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background: white;
    border-radius: 8px;
    width: 600px;
    padding: 20px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    color: #666;
`;

const ModalContent = styled.div`
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
`;

const Section = styled.div`
    width: 50%;
    padding: 20px;

    &:first-child {
        border-right: 1px solid #e0e0e0;
    }
`;

const Title = styled.h2`
    font-size: 1.2rem;
    margin: 0 0 15px 0;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
`;

const StudentList = styled.div`
    max-height: 125px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-top: 10px;

    // 스크롤바 숨기기 

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Checkbox = styled.input`
    margin: 0;
`;

const StudentItem = styled.label`
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: #f5f5f5;
    }
`;

const SectionTitle = styled.h3`
    margin: 0 0 15px 0;
    font-size: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 15px;
    width: 100%;

    button {
        flex: 1; // 각 버튼이 동일한 비율로 공간을 차지
        min-width: 0; // flex item이 너무 커지는 것을 방지
    }
`;

const initClassInfo = {
  classId      : '',
  classroomName: ''
};

const ExamShareModal = ({ isOpen, onClose, setSelectedTest }) => {
  const [classInfo, setClassInfo] = useState(initClassInfo);
  const [studentInfo, setStudentInfo] = useState([]);
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('3');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [testType, setTestType] = useState('');

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => prev.includes(studentId)
      ? prev.filter(id => id !== studentId) : [...prev, studentId]);
  };

  const handleShare = () => {
    console.log('공유하기: ', { classInfo, setSelectedTest, testType, selectedStudents, year, month });

    /* 여기서부터 메서드 호출해서 보내기 */
  };

  const fetchAllStudent = async () => {
    const userInfo = JSON.parse(localStorage.getItem('info'));
    const result = await getAllStudent(userInfo.classroom.id);

    setClassInfo(prev => ({
      ...prev,
      classId      : userInfo.classroom.id,
      classroomName: userInfo.classroom.classroomName
    }));

    setStudentInfo(result.data);
  };

  useEffect(() => {
    fetchAllStudent();

  }, []);

  if (!isOpen) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>공유하기</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          <Section>
            <SectionTitle>과제 공유</SectionTitle>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="2024">2024년</option>
              <option value="2023">2023년</option>
            </Select>
            <Select value={month} onChange={(e) => setMonth(e.target.value)}>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}월</option>
              ))}
            </Select>
            <Select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
            >
              <option value="">시험 선택</option>
              <option value="중간고사">중간고사</option>
              <option value="기말고사">기말고사</option>
              <option value="수행평가">수행평가</option>
            </Select>
          </Section>
          <Section>
            <SectionTitle>과제 공유 대상 선택</SectionTitle>
            <StudentList>
              {studentInfo.map(student => (
                <StudentItem key={student.id}>
                  <Checkbox
                    type="checkbox"
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelect(student.id)}
                  />
                  <div>
                    <div>{student.studentFullName}<span
                      style={{ fontSize: '0.8em', color: '#666' }}>({student.studentLoginId})</span></div>
                  </div>
                </StudentItem>
              ))}
            </StudentList>
            <ButtonContainer>
              <Button
                onClick={handleShare}
                disabled={!setSelectedTest || selectedStudents.length === 0}
                $primary
              >
                공유하기
              </Button>
              <Button $karina
                      onClick={onClose}>
                취소</Button>
            </ButtonContainer>
          </Section>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ExamShareModal;