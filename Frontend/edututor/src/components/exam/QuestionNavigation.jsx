import React from 'react';

function QuestionNavigation({ total, current, onNavigate }) {
  return (
      <div>
        {[...Array(total)].map((_, index) => (
            <button
                key={index}
                style={{ backgroundColor: index === current ? 'blue' : 'gray' }}
                onClick={() => onNavigate(index)}
            >
              {index + 1}
            </button>
        ))}
      </div>
  );
}

export default QuestionNavigation;
