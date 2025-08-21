import React from 'react';

const ThumbnailPreview = ({ thumbnails }) => {
  const downloadThumbnail = (thumbnail) => {
    const link = document.createElement('a');
    link.href = thumbnail.url;
    link.download = `thumbnail-${thumbnail.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="thumbnail-preview">
      <h2>Generated Thumbnails</h2>
      <div className="thumbnails-grid">
        {thumbnails.map((thumbnail) => (
          <div key={thumbnail.id} className="thumbnail-item">
            <img src={thumbnail.url} alt={thumbnail.title} />
            <div className="thumbnail-info">
              <p>{thumbnail.title}</p>
              <button 
                className="download-btn"
                onClick={() => downloadThumbnail(thumbnail)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailPreview;