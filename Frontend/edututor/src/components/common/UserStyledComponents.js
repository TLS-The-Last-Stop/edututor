// UserStyledComponents.js
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

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
    background-color: ${props => props.$isFilled ? '#e8f4ff' : 'white'};

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

export const SubTitle = styled.h3`
    font-size: 1rem;
    margin: ${props => props.$isModal ? 0 : '1rem'};
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

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        opacity: 0.7;
    }

    ${props => {
        if (props.$primary) {
            return css`
                background-color: #1890ff;
                color: white;
                border: none;

                &:hover {
                    background-color: #40a9ff;
                }
            `;
        } else if (props.$karina) {
            return css`
                background-color: white;
                color: #1890ff;
                border: 1px solid #1890ff;

                &:hover {
                    background-color: white;
                    color: #40a9ff;
                    border-color: #40a9ff;
                }
            `;
        } else {
            return css`
                background-color: #f5f5f5;
                color: #333;
                border: 1px solid #d9d9d9;

                &:hover {
                    background-color: #e8e8e8;
                }
            `;
        }
    }}
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

/* 로그인 구분 화면 */
export const LoginTypeContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;

    &::before {
        content: '로그인 유형을 선택해주세요';
        position: absolute;
        top: -3rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.125rem;
        color: #333;
        white-space: nowrap;
    }
`;


export const LoginTypeBox = styled.div`
    position: relative;
    width: 200px;
    padding: 2rem;
    border: 2px solid ${props => props.$active ? '#1890ff' : '#e1e1e1'};
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 200px; /* 높이 고정으로 버튼 위치 통일 */

    &:hover {
        border-color: #1890ff;
    }

    ${props => props.$active && css`
        &::before {
            content: '';
            position: absolute;
            top: -12px;
            right: 100px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #1890ff;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
            background-size: 16px;
            background-position: center;
            background-repeat: no-repeat;
        }
    `}
    .image-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: auto;
    }

    img {
        margin-bottom: 1rem;
    }

    .image-container::after {
        content: ${props => props.$type === 'teacher' ? '"선생님"' : '"학생"'};
        display: block;
        font-size: 1.125rem;
        font-weight: 500;
        margin-top: 1rem;
        color: #333;
    }

    /* 버튼 컨테이너 */

    .button-container {
        width: 100%;
        margin-top: 1rem;
    }
`;

/* 로그인 화면 */
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


export const LinkGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
`;

// Link 컴포넌트를 기반으로 한 스타일 컴포넌트
export const StyledRouterLink = styled(Link)`
    color: #666;
    text-decoration: none;
    position: relative;

    &:hover {
        color: #40a9ff;
    }

    &:not(:last-child) {
        padding-right: 1rem;

        &:after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 12px;
            width: 1px;
            background-color: #d9d9d9;
        }
    }
`;

export const SNSLoginSection = styled.div`
    margin-top: 1rem;
    text-align: center;
`;

export const SNSTitle = styled.div`
    position: relative;
    margin: 1rem 0;
    text-align: center;
    font-weight: bold;

    &::before, &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 40%;
        height: 1px;
        background-color: #e1e1e1;
    }

    &::before {
        left: 0;
    }

    &::after {
        right: 0;
    }
`;

export const SNSButtonGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-top: 1rem;
`;

export const SNSButton = styled.button`
    width: 100%;
    height: 45px;
    border: 1px solid #e1e1e1;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;

    ${props => {
        switch (props.$provider) {
            case 'naver':
                return css`
                    background: #00c73c;
                    border: none;
                    color: white;

                    img {
                        height: 30px;
                        width: auto;
                    }

                    &:hover {
                        background: #00b336;
                    }
                `;
            case 'kakao':
                return css`
                    background: #ffeb1e;
                    border: none;
                    color: #333;

                    img {
                        height: 30px;
                        width: auto;
                    }

                    &:hover {
                        background: #ffd700;
                    }
                `;
            case 'google':
                return css`
                    background: #fff;
                    border: 1px solid #e1e1e1;
                    color: #333;

                    img {
                        height: 24px;
                        width: auto;
                    }

                    &:hover {
                        background: #f8f8f8;
                    }
                `;
            default:
                return '';
        }
    }
    }

`;

export const LogoText = styled.span`
    font-size: 0.875rem;
    font-weight: 500;
`;

