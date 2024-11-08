import { useState } from 'react';
import '../../assets/css/IssueModal.css';
import { showALert } from '../../utils/SwalAlert.js';

const IssueModal = ({ isOpen, onClose, questionName }) => {
  const [issueContent, setIssueContent] = useState('');

  const handleIssueSubmit = () => {
    const message = { icon: 'success', title: `문제에 대한 이슈가 접수되었습니다: ${issueContent}` };
    showALert(message);
    // 실제 이슈 처리 로직을 여기에 추가할 수 있습니다. 예: 서버에 이슈 데이터 전송
    onClose(); // 모달 닫기
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content issue-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="modal-title">오류 문항 이슈</h2>

        <div className="modal-body">
          <label htmlFor="questionName">문제 이름</label>
          <input
            type="text"
            id="questionName"
            value={questionName}
            readOnly
            className="input-field"
          />

          <label htmlFor="issueContent">오류 내용</label>
          <textarea
            id="issueContent"
            value={issueContent}
            onChange={(e) => setIssueContent(e.target.value)}
            placeholder="오류 내용을 입력하세요."
            className="textarea-field"
          />

          <div className="modal-actions">
            <button onClick={handleIssueSubmit} className="confirm-button">확인</button>
            <button onClick={onClose} className="cancel-button">취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
