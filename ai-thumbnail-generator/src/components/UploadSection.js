import React, { useRef } from 'react';

const UploadSection = ({ title, onFileUpload, multiple, color }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      if (multiple) {
        onFileUpload(Array.from(e.target.files));
      } else {
        onFileUpload(e.target.files[0]);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const getColorClass = () => {
    return color === 'purple' ? 'purple-button' : 'pink-button';
  };

  return (
    <div className="upload-section">
      <h2>{title}</h2>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <button
        className={`choose-image-button ${getColorClass()}`}
        onClick={handleButtonClick}
      >
        Choose Image{multiple ? 's' : ''}
      </button>
    </div>
  );
};

export default UploadSection;