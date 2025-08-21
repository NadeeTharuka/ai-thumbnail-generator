import React, { useState } from 'react';
import UploadSection from './components/UploadSection';
import TextInputSection from './components/TextInputSection';
import GenerateButton from './components/GenerateButton';
import ThumbnailPreview from './components/ThumbnailPreview';

function App() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [characterImages, setCharacterImages] = useState([]);
  const [thumbnailTitle, setThumbnailTitle] = useState('');
  const [additionalPrompt, setAdditionalPrompt] = useState('');
  const [generatedThumbnails, setGeneratedThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBackgroundUpload = (file) => {
    setBackgroundImage(file);
  };

  const handleCharacterUpload = (files) => {
    setCharacterImages(files);
  };

  const createMockThumbnailWithImages = (id, title) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${Math.random() * 360}, 70%, 60%)`);
    gradient.addColorStop(1, `hsl(${Math.random() * 360}, 70%, 40%)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add title text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    
    ctx.strokeText(title, canvas.width / 2, canvas.height / 2);
    ctx.fillText(title, canvas.width / 2, canvas.height / 2);
    
    // Add decorative elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 20 + 5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    return canvas.toDataURL();
  };

  const handleGenerateThumbnails = async () => {
    if (!thumbnailTitle.trim()) {
      alert('Please enter a thumbnail title');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const mockThumbnails = Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        title: thumbnailTitle,
        url: createMockThumbnailWithImages(i + 1, thumbnailTitle),
        style: `Style ${i + 1}`
      }));
      
      setGeneratedThumbnails(mockThumbnails);
      setIsLoading(false);
    }, 3000);
  };

  const canGenerate = thumbnailTitle.trim().length > 0;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎨 AI Thumbnail Studio</h1>
        <p>Create stunning YouTube thumbnails with AI. Upload your images, add a title, and let our AI generate amazing thumbnails for you!</p>
      </header>

      <main className="app-main">
        <div className="upload-sections">
          <UploadSection
            title="🖼️ Upload Background"
            onFileUpload={handleBackgroundUpload}
            multiple={false}
            color="purple"
            uploadedFiles={backgroundImage}
          />
          <UploadSection
            title="👥 Upload Characters"
            onFileUpload={handleCharacterUpload}
            multiple={true}
            color="pink"
            uploadedFiles={characterImages}
          />
        </div>

        <TextInputSection
          thumbnailTitle={thumbnailTitle}
          setThumbnailTitle={setThumbnailTitle}
          additionalPrompt={additionalPrompt}
          setAdditionalPrompt={setAdditionalPrompt}
        />

        <GenerateButton
          onClick={handleGenerateThumbnails}
          isLoading={isLoading}
          disabled={!canGenerate}
        />

        {generatedThumbnails.length > 0 && (
          <ThumbnailPreview thumbnails={generatedThumbnails} />
        )}
      </main>
    </div>
  );
}

export default App;