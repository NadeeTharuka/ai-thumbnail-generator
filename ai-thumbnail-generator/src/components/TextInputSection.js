import React, { useState } from 'react';

const TextInputSection = ({
  thumbnailTitle,
  setThumbnailTitle,
  additionalPrompt,
  setAdditionalPrompt,
}) => {
  const [showExamples, setShowExamples] = useState(false);

  const promptExamples = [
    "remove background",
    "red background",
    "blue text, large character",
    "no overlay, center text",
    "yellow background, black text",
    "glow effect, small character left",
    "3d effect, gold border",
    "white background, red text, shadow",
    "green background, character center",
    "remove background, large text"
  ];

  const handleExampleClick = (example) => {
    setAdditionalPrompt(example);
    setShowExamples(false);
  };

  return (
    <div className="text-input-section">
      <div className="input-group">
        <label htmlFor="thumbnail-title">Thumbnail Title *</label>
        <input
          id="thumbnail-title"
          type="text"
          value={thumbnailTitle}
          onChange={(e) => setThumbnailTitle(e.target.value)}
          placeholder="e.g., Amazing Jungle Adventure, Best Gaming Tips, Epic Food Challenge"
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="additional-prompt">
          Additional Prompt 
          <br></br>
          <br></br>
          <span className="prompt-help-btn" onClick={() => setShowExamples(!showExamples)}>
            {showExamples ? '▼' : '▶'} See Examples
          </span>
        </label>
        
        {showExamples && (
          <div className="prompt-examples">
            <h4>Click any example to use it:</h4>
            <div className="examples-grid">
              {promptExamples.map((example, index) => (
                <button
                  key={index}
                  className="example-btn"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </button>
              ))}
            </div>
            
            <div className="prompt-guide">
              <h4>📝 What you can do with prompts:</h4>
              <div className="guide-section">
                <strong>🎨 Background:</strong>
                <p>red background, blue background, remove background, white background</p>
              </div>
              <div className="guide-section">
                <strong>📝 Text:</strong>
                <p>red text, large text, small text, center text, right text, glow, shadow, 3d</p>
              </div>
              <div className="guide-section">
                <strong>👤 Character:</strong>
                <p>large character, small character, character left, character center, square character</p>
              </div>
              <div className="guide-section">
                <strong>🖼️ Effects:</strong>
                <p>no overlay, gold border, red border, glow effect, shadow effect</p>
              </div>
            </div>
          </div>
        )}
        
        <textarea
          id="additional-prompt"
          value={additionalPrompt}
          onChange={(e) => setAdditionalPrompt(e.target.value)}
          placeholder="e.g., remove background, red text, large character left, glow effect"
          rows={3}
        />
        
        <div className="prompt-tips">
          💡 <strong>Quick tip:</strong> Try combining multiple instructions like "blue background, white text, character center, glow effect"
        </div>
      </div>
    </div>
  );
};

export default TextInputSection;