import React from 'react';

const UploadSection = ({ title, onFileUpload, multiple, color, uploadedFiles }) => {
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      if (multiple) {
        onFileUpload(Array.from(e.target.files));
      } else {
        onFileUpload(e.target.files[0]);
      }
    }
  };

  const getColorClass = () => {
    return color === 'purple' ? 'purple-button' : 'pink-button';
  };

  const renderPreview = () => {
    if (!uploadedFiles) return null;

    if (multiple && Array.isArray(uploadedFiles)) {
      return (
        <div className="image-preview-grid">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="preview-item">
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Character ${index + 1}`}
                className="preview-image"
              />
              <span className="file-name">{file.name}</span>
            </div>
          ))}
        </div>
      );
    } else if (!multiple && uploadedFiles) {
      return (
        <div className="preview-item">
          <img 
            src={URL.createObjectURL(uploadedFiles)} 
            alt="Background"
            className="preview-image"
          />
          <span className="file-name">{uploadedFiles.name}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="upload-section">
      <h2>{title}</h2>
      <input
        type="file"
        onChange={handleFileChange}
        multiple={multiple}
        accept="image/*"
        className="file-input"
        id={`file-input-${color}`}
      />
      <label htmlFor={`file-input-${color}`} className={`choose-image-button ${getColorClass()}`}>
        Choose Image{multiple ? 's' : ''}
      </label>
      {renderPreview()}
    </div>
  );
};

export default UploadSection;