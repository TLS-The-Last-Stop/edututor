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
    margin-bottom: 20px;
`;

const VideoContainer = styled.div`
    width: 100%;
    height: 315px;
    overflow: hidden;
    border-radius: 8px;
`;

const MaterialPreviewModal = ({ isOpen, onClose, material }) => {
  if (!isOpen) return null;

  // YouTube URL을 포함하는 iframe을 반환
  const renderVideo = (url) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    return videoId ? (
        <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    ) : (
        <p>유효한 YouTube URL이 아닙니다.</p>
    );
  };

  return (
      <ModalOverlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <Title>{material?.title || '학습자료 미리보기'}</Title>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>
          <ModalContent>{material?.content || '내용이 없습니다.'}</ModalContent>
          {material?.url && (
              <VideoContainer>
                {renderVideo(material.url)}
              </VideoContainer>
          )}
        </ModalContainer>
      </ModalOverlay>
  );
};

export default MaterialPreviewModal;
