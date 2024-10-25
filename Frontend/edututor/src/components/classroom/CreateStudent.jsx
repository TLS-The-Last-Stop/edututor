import styled from 'styled-components';

const CreateButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background-color: #F3E8FF;
    color: #6B21A8;
    border: none;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #E9D5FF;
    }
`;

const CreateStudent = () => {
  return (
    <CreateButton>
      + 학생 계정 생성
    </CreateButton>
  );
};

export default CreateStudent;