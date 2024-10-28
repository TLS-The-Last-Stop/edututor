import styled from 'styled-components';
import { FiUsers } from 'react-icons/fi';

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background-color: #F9FAFB;
    border-radius: 0.5rem;
    text-align: center;
`;

const IconWrapper = styled.div`
    margin-bottom: 1.5rem;
    color: #9CA3AF;
`;

const EmptyTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
    color: #6B7280;
    font-size: 1rem;
    max-width: 24rem;
    margin: 0 auto;
`;

const EmptyState = () => {
  return (
    <EmptyContainer>
      <IconWrapper>
        <FiUsers size={48} />
      </IconWrapper>
      <EmptyTitle>등록된 구성원이 없습니다.</EmptyTitle>
      <EmptyDescription>
        오른쪽 상단의 <b style={{ color: '#6B21A8' }}>학생 계정 생성</b> 버튼을 클릭해 새로운 구성원을 추가할 수 있습니다.
      </EmptyDescription>
    </EmptyContainer>
  );
};

export default EmptyState;