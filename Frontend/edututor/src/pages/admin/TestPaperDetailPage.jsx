import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicApi } from '../../api/axios.js';
import Loading from '../../components/common/Loading.jsx';
import styled from 'styled-components';

const PageContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-bottom: 1.5rem;
`;

const SubTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #555;
    margin-bottom: 1rem;
`;

const StatusText = styled.p`
    font-size: 1rem;
    font-weight: 500;
    color: ${props => (props.active ? '#4caf50' : '#f44336')};
    margin-bottom: 1.5rem;
`;

const QuestionBlock = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
`;

const QuestionHeader = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.75rem;
`;

const QuestionDetails = styled.div`
    font-size: 0.95rem;
    color: #555;
    margin-bottom: 0.75rem;

    span {
        font-weight: 600;
        color: #333;
    }
`;

const OptionsList = styled.ul`
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    list-style-type: disc;
`;

const OptionItem = styled.li`
    font-size: 1rem;
    color: ${props => (props.isCorrect ? '#4caf50' : '#333')};
    font-weight: ${props => (props.isCorrect ? '600' : '400')};
    margin-bottom: 0.25rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
`;

const EditButton = styled.button`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: #3182ce;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #2c5282;
    }
`;

const DeleteButton = styled.button`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: #f44336;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #d32f2f;
    }
`;

const TestPaperDetailPage = () => {
  const { testPaperId } = useParams();
  const navigate = useNavigate();
  const [testPaperData, setTestPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestPaper = async () => {
      try {
        const response = await publicApi.get(`/test-paper/${testPaperId}`);
        setTestPaperData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('시험지 데이터를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchTestPaper();
  }, [testPaperId]);

  const handleEditClick = () => {
    navigate(`/admin/test-paper/edit/${testPaperId}`);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("정말로 이 시험지를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await publicApi.delete(`/test-paper/${testPaperId}`);
      alert('시험지가 성공적으로 삭제되었습니다.');
      navigate(-1);
    } catch (error) {
      alert('시험지 삭제 중 오류가 발생했습니다.');
    }
  };

  const getLevelLabel = (level) => {
    switch(level) {
      case 1: return '하';
      case 2: return '중';
      case 3: return '상';
      default: return '알 수 없음';
    }
  };

  const getTypeLabel = (type) => {
    return type === 'SUBJECTIVE' ? '주관식' : '객관식';
  };

  if (loading) return <p><Loading /></p>;
  if (error) return <p>{error}</p>;

  return (
      <PageContainer>
        <Title>시험지 상세</Title>
        {testPaperData && (
            <div>
              <SubTitle>시험지 제목: {testPaperData.title || '제목 없음'}</SubTitle>

              {testPaperData.questions && testPaperData.questions.length > 0 ? (
                  testPaperData.questions.map((question, index) => (
                      <QuestionBlock key={question.id}>
                        <QuestionHeader>문제 {index + 1}</QuestionHeader>
                        <QuestionDetails><span>내용:</span> {question.content}</QuestionDetails>
                        <QuestionDetails><span>유형:</span> {getTypeLabel(question.type)}</QuestionDetails>
                        <QuestionDetails><span>난이도:</span> {getLevelLabel(question.level)}</QuestionDetails>
                        {question.commentary && (
                            <QuestionDetails><span>해설:</span> {question.commentary}</QuestionDetails>
                        )}
                        {question.type === 'SUBJECTIVE' && (
                            <QuestionDetails><span>주관식 정답:</span> {question.answerText}</QuestionDetails>
                        )}
                        {question.type === 'OBJECTIVE' && question.options.length > 0 && (
                            <OptionsList>
                              {question.options.map((option) => (
                                  <OptionItem key={option.id} isCorrect={option.isCorrect}>
                                    {option.content} {option.isCorrect ? '(정답)' : ''}
                                  </OptionItem>
                              ))}
                            </OptionsList>
                        )}
                      </QuestionBlock>
                  ))
              ) : (
                  <p>질문이 없습니다.</p>
              )}
              <ButtonContainer>
                <EditButton onClick={handleEditClick}>수정하기</EditButton>
                <DeleteButton onClick={handleDeleteClick}>삭제하기</DeleteButton>
              </ButtonContainer>
            </div>
        )}
      </PageContainer>
  );
};

export default TestPaperDetailPage;
