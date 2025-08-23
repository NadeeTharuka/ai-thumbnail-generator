import React from 'react';

const ThumbnailPreview = ({ thumbnails }) => {
  const handleDownload = (thumbnail, index) => {
    if (thumbnail.blob) {
      const url = URL.createObjectURL(thumbnail.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${thumbnail.title.replace(/\s+/g, '_')}_thumbnail_${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleCopyToClipboard = async (thumbnail) => {
    if (thumbnail.blob) {
      try {
        const clipboardItem = new ClipboardItem({ 'image/png': thumbnail.blob });
        await navigator.clipboard.write([clipboardItem]);
        alert('Thumbnail copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        alert('Failed to copy to clipboard. Your browser may not support this feature.');
      }
    }
  };

  return (
    <div className="thumbnail-preview">
      <h2>Generated Thumbnails</h2>
      <p className="preview-description">
        Here are your AI-generated thumbnails. Click download to save them or copy to clipboard.
      </p>
      
      <div className="thumbnails-grid">
        {thumbnails.map((thumbnail, index) => (
          <div key={thumbnail.id} className="thumbnail-item">
            <div className="thumbnail-image-container">
              <img src={thumbnail.url} alt={`${thumbnail.title} - Version ${index + 1}`} />
              <div className="thumbnail-overlay">
                <button 
                  className="action-button download-btn"
                  onClick={() => handleDownload(thumbnail, index)}
                  title="Download thumbnail"
                >
                  📥 Download
                </button>
                <button 
                  className="action-button copy-btn"
                  onClick={() => handleCopyToClipboard(thumbnail)}
                  title="Copy to clipboard"
                >
                  📋 Copy
                </button>
              </div>
            </div>
            <div className="thumbnail-info">
              <p className="thumbnail-title">{thumbnail.title}</p>
              <p className="thumbnail-version">Version {index + 1}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="preview-tips">
        <h3>💡 Tips:</h3>
        <ul>
          <li>Download thumbnails in PNG format for best quality</li>
          <li>Try different prompts to get varied results</li>
          <li>Upload high-quality images for better thumbnails</li>
          <li>Each version offers a unique style variation</li>
        </ul>
      </div>
    </div>
  );
};

export default ThumbnailPreview;