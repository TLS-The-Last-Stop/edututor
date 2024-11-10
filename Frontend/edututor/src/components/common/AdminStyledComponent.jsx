import styled from 'styled-components';
import { useRef } from 'react';

const InputWrapper = styled.div`
    width: 100%;

    * {
        box-sizing: border-box;
    }
`;

const InputBase = styled.input`
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
`;

const TextArea = styled(InputBase).attrs({ as: 'textarea' })`
    height: auto;
    min-height: 40px;
    max-height: ${props => props.maxHeight || '200px'};
    resize: vertical;
    padding: 0.75rem;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
`;

const Select = styled(InputBase).attrs({ as: 'select' })`
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
`;

export const Input = ({ ...props }) => (
  <InputWrapper>
    <InputBase {...props} />
  </InputWrapper>
);

export const ContentTextArea = ({ maxHeight = '200px', ...props }) => (
  <InputWrapper>
    <TextArea maxHeight={maxHeight} {...props} />
  </InputWrapper>
);

export const SelectInput = ({ children, ...props }) => (
  <InputWrapper>
    <Select {...props}>{children}</Select>
  </InputWrapper>
);

const FileInputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const HiddenFileInput = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
`;

const FileInputButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 40px;
    padding: 0 1rem;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    color: #555;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #f8fafc;
        border-color: #cbd5e0;
    }
`;

const FileNameDisplay = styled.div`
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: #666;
`;

export const FileInput = ({ onChange, value }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <FileInputWrapper>
      <HiddenFileInput
        type="file"
        onChange={onChange}
        ref={fileInputRef}
        accept="image/*"
      />
      <FileInputButton type="button" onClick={handleClick}>
        {value ? '이미지 변경' : '이미지 선택'}
      </FileInputButton>
      {value && (
        <FileNameDisplay>
          선택된 파일: {value.name}
        </FileNameDisplay>
      )}
    </FileInputWrapper>
  );
};