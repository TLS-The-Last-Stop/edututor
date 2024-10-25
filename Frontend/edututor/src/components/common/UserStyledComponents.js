// UserStyledComponents.js
import styled, { css } from 'styled-components';

// 공통 스타일

const fullWidthInputStyles = css`
    display: grid;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
`;

const inputStyles = css`
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid ${props => props.$hasError ? '#ff4d4f' : '#d9d9d9'};
    border-radius: 4px;
    font-size: 0.875rem;
    height: 42px;
    box-sizing: border-box;
    background-color: white;

    &:focus {
        outline: none;
        border-color: ${props => props.$hasError ? '#ff4d4f' : '#40a9ff'};
        box-shadow: 0 0 0 2px ${props => props.$hasError ?
                'rgba(255, 77, 79, 0.2)' :
                'rgba(24, 144, 255, 0.2)'};
    }

    &:disabled, &[readonly] {
        background-color: #f5f5f5;
        cursor: not-allowed;
    }
`;

// 레이아웃 컴포넌트
export const Container = styled.main`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #f5f5f5;
`;

export const FormSection = styled.section`
    width: 100%;
    max-width: 600px;
`;

export const FormContainer = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// 헤더 컴포넌트
export const FormHeader = styled.header`
    margin-bottom: 2rem;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
`;

// 폼 그룹 컴포넌트
export const FieldSet = styled.fieldset`
    border: none;
    border-bottom: 1px solid #eee;
    padding: 1.5rem;

    &:last-of-type {
        border-bottom: none;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 1.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

// 입력 관련 컴포넌트
export const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #333;
`;

export const Required = styled.span`
    color: #ff4d4f;
    margin-left: 4px;
`;

// 버튼 컴포넌트
export const Button = styled.button`
    ${inputStyles}
    cursor: pointer;
    white-space: nowrap;
    min-width: 80px;
    font-weight: 500;

    ${props => props.$primary ? css`
        background-color: #1890ff;
        color: white;
        border: none;

        &:hover {
            background-color: #40a9ff;
        }
    ` : css`
        background-color: #f5f5f5;
        color: #333;
        border: 1px solid #d9d9d9;

        &:hover {
            background-color: #e8e8e8;
        }
    `}
`;

export const Input = styled.input`
    ${inputStyles}
    width: 100%; // 부모 컨테이너의 전체 너비 사용
    min-width: 0; // grid 아이템이 너무 커지는 것 방지
`;

export const Select = styled.select`
    ${inputStyles}
    width: 100%; // 부모 컨테이너의 전체 너비 사용
    min-width: 0; // grid 아이템이 너무 커지는 것 방지
`;

// 그리드 레이아웃 컴포넌트
export const InputGroup = styled.div`
    ${fullWidthInputStyles}
    grid-template-columns: 1fr auto;
    gap: 8px;

    ${Input} {
        flex: 1;
        min-width: 0;
    }

    ${Button} {
        width: 120px; // 버튼 너비 고정
    }
`;
export const SelectGroup = styled.div`
    display: grid;
    /* 전화번호 입력 필드들이 한 줄을 꽉 채우도록 설정 */
    grid-template-columns: minmax(90px, 120px) 30px 1fr 30px 1fr;
    align-items: center;
    gap: 8px;
    width: 100%; // 전체 너비 사용
`;

export const DateInput = styled(Input)`
    text-align: center;
    width: 100%;

    &:first-child {
        flex: 1.2; // 년도 입력창은 조금 더 넓게
    }
`;

export const Divider = styled.span`
    color: #666;
    font-weight: 500;
    text-align: center;
    line-height: 42px;
    flex-shrink: 0;
    user-select: none; // 텍스트 선택 방지
`;

export const DateGroup = styled.div`
    ${fullWidthInputStyles}
    display: flex; // grid 대신 flex 사용
    gap: 8px;

    ${DateInput} {
        flex: 1; // 입력창이 남은 공간을 채우도록
        min-width: 0; // flex item overflow 방지
    }

    ${Divider} {
        padding: 0 4px;
        flex-shrink: 0; // 구분자는 크기 고정
    }
`;


// 라디오 버튼 컴포넌트
export const RadioGroup = styled.div`
    display: flex;
    gap: 2rem;
    margin: 1rem 0;
    width: 100%;
`;

export const RadioLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #333;
`;

export const RadioInput = styled.input`
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #d9d9d9;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    margin: 0;

    &:checked {
        border-color: #1890ff;
        background: white;
        border-width: 5px;
    }

    &:hover {
        border-color: #40a9ff;
    }
`;

// 에러 메시지 컴포넌트
export const ErrorText = styled.div`
    color: #ff4d4f;
    font-size: 0.75rem;
    margin-top: 4px;
    grid-column: 1 / -1;
`;

export const EmailGroup = styled.div`
    ${fullWidthInputStyles}
    display: flex;
    align-items: center;
    gap: 8px;

    ${Input} {
        flex: 1;
        min-width: 0;
    }

    ${Select} {
        width: 120px; // 도메인 선택 드롭다운 너비 고정
        flex-shrink: 0;
    }

    ${Divider} {
        flex-shrink: 0;
        padding: 0 4px;
    }
`;

export const JoinButtonGroup = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    margin-top: 2rem;

    ${Button} {
        flex: 1; // 버튼이 공간을 균등하게 나눠 가짐
        width: auto; // width: 50% 대신 flex: 1 사용
    }
`;

export const SuccessText = styled.div`
    margin-top: 4px;
    font-size: 0.875rem;
    color: ${props => props.$isSuccess ? '#2196F3' : '#f44336'};
`;

export const ClassroomGroup = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;

    select {
        flex: 2;
        max-width: 100px;
    }

    input {
        flex: 3;
    }
`;