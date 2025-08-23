import React, { useRef } from 'react';

const UploadSection = ({ title, onFileUpload, multiple, color, uploadedFile, uploadedFiles }) => {
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

  const createImagePreview = (file) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="upload-section">
      <h2>{title}</h2>
      
      {/* Show preview of uploaded images */}
      {uploadedFile && !multiple && (
        <div className="image-preview">
          <img 
            src={createImagePreview(uploadedFile)} 
            alt="Background preview" 
            className="preview-image"
          />
          <p className="file-name">{uploadedFile.name}</p>
        </div>
      )}
      
      {uploadedFiles && multiple && uploadedFiles.length > 0 && (
        <div className="images-preview">
          <div className="preview-grid">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="preview-item">
                <img 
                  src={createImagePreview(file)} 
                  alt={`Character ${index + 1}`} 
                  className="preview-image-small"
                />
                <p className="file-name-small">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
        {(uploadedFile && !multiple) || (uploadedFiles && uploadedFiles.length > 0) 
          ? `Change Image${multiple ? 's' : ''}` 
          : `Choose Image${multiple ? 's' : ''}`
        }
      </button>
      
      {((uploadedFile && !multiple) || (uploadedFiles && multiple && uploadedFiles.length > 0)) && (
        <p className="upload-status">✓ {multiple ? `${uploadedFiles.length} image(s)` : '1 image'} uploaded</p>
      )}
    </div>
  );
};

export default UploadSection;