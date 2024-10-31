import styled from 'styled-components';

const InfoContainer = styled.div`
    margin: 60px 0 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    border-radius: 15px;
`;

const LeftWrapper = styled.div`
    border: 1px solid #9b9b9b;
    border-radius: 15px;
    width: 50%;
`;

const RightWrapper = styled.div`
    width: 50%;

`;

//const

const InfoSection = () => {
  return (
    <InfoContainer>
      <LeftWrapper><h3>안녕 왼쪽</h3></LeftWrapper>
      <RightWrapper><h3>안녕 오른쪾</h3></RightWrapper>
    </InfoContainer>
  );
};

export default InfoSection;