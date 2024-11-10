import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/TestPaperCreationPage.css';
import { publicApi } from '../../api/axios.js';
import { showALert } from '../../utils/SwalAlert.js';
import styled from 'styled-components';
import { ContentTextArea, Input, SelectInput } from '../../components/common/AdminStyledComponent.jsx';

const PageContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
    gap: 1rem;

    &.vertical {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }

    label {
        font-weight: 500;
        color: #555;
        font-size: 0.9rem;
    }

    input[type="text"],
    textarea,
    select {
        padding: 0.625rem;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        width: 100%;
        font-size: 0.95rem;
        background-color: #fff;
        transition: border-color 0.2s;
        height: 40px;

        &:focus {
            outline: none;
            border-color: #4a90e2;
        }
    }

    textarea {
        height: 100px;
        resize: vertical;
        padding: 0.75rem;
    }

    select {
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        padding-right: 2.5rem;
    }
`;

const QuestionBlock = styled.div`
    background-color: #f8fafc;
    padding: 1.5rem;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
`;

const QuestionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e2e8f0;

    h4 {
        margin: 0;
        color: #333;
        font-size: 1rem;
        font-weight: 600;
    }
`;

const OptionBlock = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 120px;
    gap: 1rem;
    align-items: center;
    background-color: white;
    padding: 1rem;
    border-radius: 4px;
    margin: 0.75rem 0;
    border: 1px solid #edf2f7;
`;

const CheckboxField = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    label {
        font-size: 0.9rem;
        color: #555;
    }

    input[type="checkbox"] {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
`;

const Button = styled.button`
    height: 40px;
    padding: 0 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const AddButton = styled(Button)`
    background-color: #f0f7ff;
    color: #2b6cb0;
    border: 1px solid #bee3f8;
    min-width: 100px;

    &:hover:not(:disabled) {
        background-color: #e3effd;
    }
`;

const RemoveButton = styled(Button)`
    background-color: #fff5f5;
    color: #c53030;
    border: 1px solid #fed7d7;

    &:hover:not(:disabled) {
        background-color: #fee2e2;
    }
`;

const SubmitButton = styled(Button)`
    background-color: #3182ce;
    color: white;
    width: 100%;
    height: 48px;
    margin-top: 1rem;
    font-size: 1rem;

    &:hover:not(:disabled) {
        background-color: #2c5282;
    }
`;

const TestPaperCreationPage = () => {
  const [formData, setFormData] = useState({
    unitId   : '',
    title    : '',
    questions: [
      {
        content   : '',
        passage   : '',
        commentary: '',
        type      : 'OBJECTIVE',
        answerText: '',
        level     : '1',
        options   : [
          { content: '', isCorrect: false },
          { content: '', isCorrect: false }
        ]
      }
    ]
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const unitId = queryParams.get('unitId');

  useEffect(() => {
    if (unitId) {
      setFormData((prevData) => ({ ...prevData, unitId }));
    }
  }, [unitId]);

  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = { ...formData };

    if (optionIndex !== undefined) {
      updatedFormData.questions[questionIndex].options[optionIndex][name] = type === 'checkbox' ? checked : value;
    } else if (questionIndex !== undefined) {
      updatedFormData.questions[questionIndex][name] = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          content   : '',
          passage   : '',
          commentary: '',
          type      : 'OBJECTIVE',
          answerText: '',
          level     : '1',
          options   : [
            { content: '', isCorrect: false },
            { content: '', isCorrect: false }
          ]
        }
      ]
    });
  };

  const removeQuestion = (questionIndex) => {
    const updatedQuestions = formData.questions.filter((_, index) => index !== questionIndex);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push({ content: '', isCorrect: false });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const modifiedFormData = {
      ...formData,
      questions: formData.questions.map(question => ({
        ...question,
        level: question.level
      }))
    };

    try {
      await publicApi.post('/test-paper', modifiedFormData);
      const message = { icon: 'success', title: '시험지가 성공적으로 등록되었습니다.' };
      showALert(message);
      window.history.back();
    } catch (error) {
      const message = { icon: 'error', title: '시험지 등록 중 오류가 발생했습니다.' };
      showALert(message);
    }
  };

  return (
    <PageContainer>
      <Title>시험지 생성</Title>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label>시험지 제목</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="시험지 제목을 입력하세요"
          />
        </FormField>

        {formData.questions.map((question, questionIndex) => (
          <QuestionBlock key={questionIndex}>
            <QuestionHeader>
              <h4>문제 {questionIndex + 1}</h4>
              <RemoveButton
                type="button"
                onClick={() => removeQuestion(questionIndex)}
              >
                문제 제거
              </RemoveButton>
            </QuestionHeader>

            <FormField>
              <label>유형</label>
              <SelectInput
                name="type"
                value={question.type}
                onChange={(e) => handleInputChange(e, questionIndex)}
              >
                <option value="OBJECTIVE">객관식</option>
                <option value="SUBJECTIVE">주관식</option>
              </SelectInput>
            </FormField>

            <FormField>
              <label>문제 내용</label>
              <ContentTextArea
                name="content"
                value={question.content}
                onChange={(e) => handleInputChange(e, questionIndex)}
                required
                placeholder="문제 내용을 입력하세요"
                maxHeight="200px"
              />
            </FormField>

            <FormField>
              <label>난이도</label>
              <SelectInput
                name="level"
                value={question.level}
                onChange={(e) => handleInputChange(e, questionIndex)}
              >
                <option value="1">하</option>
                <option value="2">중</option>
                <option value="3">상</option>
              </SelectInput>
            </FormField>

            <FormField>
              <label>지문</label>
              <ContentTextArea
                name="passage"
                value={question.passage}
                onChange={(e) => handleInputChange(e, questionIndex)}
                placeholder="지문을 입력하세요"
              />
            </FormField>

            <FormField>
              <label>해설</label>
              <ContentTextArea
                name="commentary"
                value={question.commentary}
                onChange={(e) => handleInputChange(e, questionIndex)}
                placeholder="해설을 입력하세요"
              />
            </FormField>

            {question.type === 'OBJECTIVE' ? (
              <>
                {question.options.map((option, optionIndex) => (
                  <OptionBlock key={optionIndex}>
                    <FormField>
                      <label>{optionIndex + 1}번</label>
                      <Input
                        type="text"
                        name="content"
                        value={option.content}
                        onChange={(e) => handleInputChange(e, questionIndex, optionIndex)}
                        required
                        placeholder={`${optionIndex + 1}번 보기를 입력하세요`}
                      />
                    </FormField>
                    <CheckboxField>
                      <label>정답</label>
                      <input
                        type="checkbox"
                        name="isCorrect"
                        checked={option.isCorrect}
                        onChange={(e) => handleInputChange(e, questionIndex, optionIndex)}
                      />
                    </CheckboxField>
                    <RemoveButton
                      type="button"
                      onClick={() => removeOption(questionIndex, optionIndex)}
                    >
                      옵션 제거
                    </RemoveButton>
                  </OptionBlock>
                ))}
                <AddButton
                  type="button"
                  onClick={() => addOption(questionIndex)}
                >
                  옵션 추가
                </AddButton>
              </>
            ) : (
              <FormField>
                <label>주관식 정답</label>
                <Input
                  type="text"
                  name="answerText"
                  value={question.answerText}
                  onChange={(e) => handleInputChange(e, questionIndex)}
                  required
                  placeholder="정답을 입력하세요"
                />
              </FormField>
            )}
          </QuestionBlock>
        ))}

        <AddButton type="button" onClick={addQuestion}>
          문제 추가
        </AddButton>
        <SubmitButton type="submit">
          시험지 등록
        </SubmitButton>
      </Form>
    </PageContainer>
  );
};

export default TestPaperCreationPage;
