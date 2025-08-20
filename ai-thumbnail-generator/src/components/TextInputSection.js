import React from 'react';

const TextInputSection = ({
  thumbnailTitle,
  setThumbnailTitle,
  additionalPrompt,
  setAdditionalPrompt,
}) => {
  return (
    <div className="text-input-section">
      <div className="input-group">
        <label htmlFor="thumbnail-title">Thumbnail Title</label>
        <input
          id="thumbnail-title"
          type="text"
          value={thumbnailTitle}
          onChange={(e) => setThumbnailTitle(e.target.value)}
          placeholder="e.g., Amazing Jungle Adventure"
        />
      </div>
      <div className="input-group">
        <label htmlFor="additional-prompt">Additional Prompt</label>
        <textarea
          id="additional-prompt"
          value={additionalPrompt}
          onChange={(e) => setAdditionalPrompt(e.target.value)}
          placeholder="e.g., more attractive and character bg color remove"
          rows={3}
        />
      </div>
    </div>
  );
};

export default TextInputSection;