import React from 'react';
import '../../assets/css/SubmitButton.css';

function SubmitButton({ onSubmit }) {
  return (
      <div className="submit-button-container">
        <button className="submit-button" onClick={onSubmit}>
          제출하기
        </button>
      </div>
  );
}

export default SubmitButton;
