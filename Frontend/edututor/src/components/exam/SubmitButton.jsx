import React from 'react';

function SubmitButton({ onSubmit }) {
  return (
      <button onClick={onSubmit}>
        제출하기
      </button>
  );
}

export default SubmitButton;
