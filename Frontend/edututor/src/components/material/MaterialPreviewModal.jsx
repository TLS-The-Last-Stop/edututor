import React from 'react';
import styled from 'styled-components';

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
    max-width: 90%;
    padding: 20px;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const Title = styled.h2`
    margin: 0;
    font-size: 1.5em;
    color: #333;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #666;
`;

const ModalContent = styled.div`
    font-size: 1em;
    color: #555;
    line-height: 1.5;
`;

const MaterialPreviewModal = ({ isOpen, onClose, material }) => {
  if (!isOpen) return null;

  return (
      <ModalOverlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <Title>{material?.title || '학습자료 미리보기'}</Title>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>
          <ModalContent>{material?.content || '내용이 없습니다.'}</ModalContent>
        </ModalContainer>
      </ModalOverlay>
  );
};

export default MaterialPreviewModal;
