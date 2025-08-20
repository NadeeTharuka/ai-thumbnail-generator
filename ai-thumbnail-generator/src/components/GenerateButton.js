import React from 'react';

const GenerateButton = ({ onClick, isLoading }) => {
  return (
    <div className="generate-button-container">
      <button
        className="generate-button"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate 4 Thumbnails'}
      </button>
    </div>
  );
};

export default GenerateButton;