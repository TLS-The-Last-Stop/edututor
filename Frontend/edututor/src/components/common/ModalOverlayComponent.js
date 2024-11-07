import styled from 'styled-components';

export const Overlay = styled.section`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    pointer-events: auto;
    opacity: 1;

    &, &:hover {
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
    }
`;

export const ModalContainer = styled.div`
    background-color: white;
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 1;
`;

export const ModalContent = styled.main`
    padding: 2rem;
`;