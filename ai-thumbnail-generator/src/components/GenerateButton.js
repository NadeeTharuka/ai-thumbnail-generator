import React from 'react';

const GenerateButton = ({ onClick, isLoading, disabled }) => {
  return (
    <div className="generate-button-container">
      <button
        className="generate-button"
        onClick={onClick}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <span>
            <span className="spinner"></span>
            Generating...
          </span>
        ) : (
          'Generate 4 Thumbnails'
        )}
      </button>
    </div>
  );
};

export default GenerateButton;