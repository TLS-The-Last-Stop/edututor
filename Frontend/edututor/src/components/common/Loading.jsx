import styled, { keyframes } from 'styled-components';

const SpinnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const SpinnerCircle = styled.div`
    width: 48px;
    height: 48px;
    border: 4px solid #f3f3f3;
    border-bottom: 4px solid #333;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.span`
    position: absolute;
    margin-top: 80px;
    font-size: 16px;
    color: #333;
`;

const Loading = () => {
  return (
    <SpinnerWrapper>
      <SpinnerCircle />
      <LoadingText>로딩중...</LoadingText>
    </SpinnerWrapper>
  );
};

export default Loading;