import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getSchool } from '../../api/user/school.js';
import { showALert } from '../../utils/SwalAlert.js';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 24px;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
    margin: 0;
    font-size: 1.25rem;
    font-weight: bold;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
`;

const SearchBox = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
    }
`;

const ResultsContainer = styled.div`
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 400px;
    overflow-y: auto;
`;

const ResultError = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    content: #666;
`;

const ResultItem = styled.div`
    padding: 12px;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:hover {
        background-color: #f8f9fa;
    }

    &:last-child {
        border-bottom: none;
    }
`;

const SchoolName = styled.div`
    font-weight: 500;
    margin-bottom: 4px;
`;

const SchoolAddress = styled.div`
    font-size: 0.875rem;
    color: #666;
`;

const SchoolType = styled.div`
    font-size: 0.875rem;
    color: #888;
    margin-top: 4px;
`;

const HelpText = styled.div`
    font-size: 0.875rem;
    color: #666;
    margin-top: 12px;
`;

const SchoolSearchModal = ({ isOpen, onClose, onSelectSchool }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    if (!isOpen) document.body.style.overflow = 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = async () => {
    if (searchKeyword.length < 2) {
      const message = { icon: 'warning', title: '2글자 이상 입력해주세요.' };
      showALert(message);
      return;
    }

    setIsLoading(true);
    try {
      const result = await getSchool(searchKeyword);
      setSearchResults(result.schoolInfo[1].row);
    } catch (error) {
      console.error('School search failed:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>학교 검색</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <SearchBox>
          <SearchInput
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            onKeyUp={handleKeyDown} placeholder="학교명을 입력해주세요 (2글자 이상)"
          />

          <SearchButton onClick={handleSearch} disabled={isLoading}>
            {isLoading ? '검색중...' : '검색'}
          </SearchButton>
        </SearchBox>

        <ResultsContainer>
          {!searchResults || searchResults.length === 0 ? (
            <ResultError>{isLoading ? '검색중...' : '검색 결과가 없습니다.'}</ResultError>
          ) : (
            Array.isArray(searchResults) ? (
              searchResults.map(school => (
                <ResultItem key={school.SD_SCHUL_CODE} onClick={() => onSelectSchool(school)}>
                  <SchoolName>{school.SCHUL_NM}</SchoolName>
                  <SchoolAddress>{school.ORG_RDNMA}</SchoolAddress>
                  <SchoolType>{school.SCHUL_KND_SC_NM}</SchoolType>
                </ResultItem>
              ))
            ) : (
              <ResultItem onClick={() => onSelectSchool(searchResults)}>
                <SchoolName>{searchResults.SCHUL_NM}</SchoolName>
                <SchoolAddress>{searchResults.ORG_RDNMA}</SchoolAddress>
                <SchoolType>{searchResults.SCHUL_KND_SC_NM}</SchoolType>
              </ResultItem>
            )
          )}
        </ResultsContainer>

        <HelpText>
          *찾으시는 학교가 없는 경우 학교명을 다시 확인해주세요
        </HelpText>

      </ModalContent>
    </ModalOverlay>
  );
};

export default SchoolSearchModal;