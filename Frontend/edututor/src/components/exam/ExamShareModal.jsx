import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getAllStudent } from '../../api/classroom/classroom.js';
import { Button } from '../common/UserStyledComponents.js';
import { createShareTest } from '../../api/test-share/testShare.js';

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

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StudentItem = styled.label`
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:last-child {
        border-bottom: none;
    }

    // 공유된 상태일 때의 스타일

    ${props => props.$isShared && `
        background-color: #f5f9ff;
    `}
    &:hover {
        background: ${props => props.$isShared ? '#e8f1ff' : '#f5f5f5'};
    }
`;

const Checkbox = styled.input`
    margin: 0;
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
        flex: 1;
        min-width: 0;
    }
`;

const SharedBadge = styled.span`
    font-size: 0.75rem;
    color: #2196f3;
    margin-left: 8px;
    padding: 2px 6px;
    background: #e3f2fd;
    border-radius: 4px;
`;


const initDate = {
  year : '',
  month: '',
  day  : ''
};


const ExamShareModal = ({ isOpen, onClose, selectedTest, fetching }) => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [date, setDate] = useState(initDate);
  const [daysInMonth, setDaysInMonth] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [testType, setTestType] = useState('');

  const isShared = (studentIsShared, unitId) => {
    return studentIsShared[unitId] || false;
  };

  const handleStudentSelect = (studentId) => {
    const isCurrentlyShared = studentInfo.find(student => student.id === studentId)?.isShared[selectedTest];
    if (isCurrentlyShared && !selectedStudents.includes(studentId)) {
      if (confirm('이미 공유된 학생입니다. 다시 공유하시겠습니까? ')) setSelectedStudents([...selectedStudents, studentId]);
    } else {
      if (selectedStudents.includes(studentId)) setSelectedStudents(selectedStudents.filter(id => id !== studentId));
      else setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const fetchAllStudent = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('info'));
      const result = await getAllStudent(userInfo.classroom.id);
      const key = Object.keys(result.data)[0];
      
      setStudentInfo(result.data[key] || []);
    } catch (error) {
      console.error('Failed to fetch students', error);
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const handleDateChange = (field) => (e) => {
    setDate(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleShare = async () => {
    const deadLineDate = new Date(
      Number(date.year),
      Number(date.month) - 1,
      Number(date.day),
      23, 59, 59
    );

    // 시간대를 명시적으로 지정
    const koreanDate = new Date(deadLineDate.getTime() - (deadLineDate.getTimezoneOffset() * 60000));

    const dataToSend = {
      unitId   : selectedTest,
      studentId: selectedStudents,
      deadline : koreanDate.toISOString()
    };

    try {
      const result = await createShareTest(dataToSend);
      if (result.status === 204) {
        alert('시험 공유가 완료되었습니다.');
        onClose();
        setSelectedStudents([]);
        fetchAllStudent();
      }
    } catch (error) {
      console.error('Failed to share test...', error);
    }

  };

  useEffect(() => {
    if (isOpen && selectedTest) {
      const sharedStudents = studentInfo
        .filter(student => student.isShared[selectedTest])
        .map(student => student.id);

      setSelectedStudents(sharedStudents);
    }
  }, [isOpen, selectedTest, studentInfo]);

  useEffect(() => {
    const today = new Date();

    setDate({
      year : today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      day  : today.getDate().toString()
    });

    const days = getDaysInMonth(date.year, date.month);
    setDaysInMonth(days);

    fetchAllStudent();
  }, []);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={() => {
      onClose();
      setSelectedStudents([]);
    }}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>공유하기</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          <Section>
            <SectionTitle>과제 공유</SectionTitle>
            <Select value={date.year}
                    onChange={handleDateChange('year')}>
              <option value="2024">2024년</option>
              <option value="2023">2023년</option>
            </Select>
            <Select value={date.month}
                    onChange={handleDateChange('month')}>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}월</option>
              ))}
            </Select>

            <Select value={date.day}
                    onChange={handleDateChange('day')}>
              {[...Array(daysInMonth)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}일</option>
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
              {studentInfo.length > 0 ? (
                studentInfo.map(student => {
                  const isAlreadyShared = isShared(student.isShared, selectedTest);
                  return (
                    <StudentItem
                      key={student.id}
                      $isShared={isAlreadyShared}
                    >
                      <Checkbox
                        type="checkbox"
                        id={`student-${student.id}`}
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelect(student.id)}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {student.fullName}
                          <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '4px' }}>
                ({student.loginId})
              </span>
                          {isAlreadyShared && (
                            <SharedBadge>
                              공유됨
                            </SharedBadge>
                          )}
                        </div>
                      </div>
                    </StudentItem>
                  );
                })
              ) : (
                <p>학생 목록이 없습니다.</p>
              )}
            </StudentList>
            <ButtonContainer>
              <Button
                onClick={handleShare}
                disabled={!selectedTest || selectedStudents.length === 0}
                $primary
              >
                공유하기
              </Button>
              <Button $karina onClick={onClose}>
                취소
              </Button>
            </ButtonContainer>
          </Section>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};


export default ExamShareModal;