import React from 'react';

const ThumbnailPreview = ({ thumbnails }) => {
  return (
    <div className="thumbnail-preview">
      <h2>Generated Thumbnails</h2>
      <div className="thumbnails-grid">
        {thumbnails.map((thumbnail) => (
          <div key={thumbnail.id} className="thumbnail-item">
            <img src={thumbnail.url} alt={thumbnail.title} />
            <p>{thumbnail.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailPreview;