import React, { useState } from 'react';
import './assets/styles/App.css';
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

  const handleGenerateThumbnails = async () => {
    if (!thumbnailTitle.trim()) {
      alert('Please enter a thumbnail title');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to generate thumbnails
    setTimeout(() => {
      // Mock generated thumbnails - in a real app, these would come from an API
      const mockThumbnails = [
        { id: 1, title: thumbnailTitle, url: 'https://via.placeholder.com/1280x720?text=Thumbnail+1' },
        { id: 2, title: thumbnailTitle, url: 'https://via.placeholder.com/1280x720?text=Thumbnail+2' },
        { id: 3, title: thumbnailTitle, url: 'https://via.placeholder.com/1280x720?text=Thumbnail+3' },
        { id: 4, title: thumbnailTitle, url: 'https://via.placeholder.com/1280x720?text=Thumbnail+4' },
      ];
      
      setGeneratedThumbnails(mockThumbnails);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI Thumbnail Studio</h1>
        <p>Quickly generate high-quality thumbnails for your YouTube videos. Upload your images and let AI do the rest!</p>
      </header>

      <main className="app-main">
        <div className="upload-sections">
          <UploadSection
            title="Upload Background"
            onFileUpload={handleBackgroundUpload}
            multiple={false}
            color="purple"
          />
          <UploadSection
            title="Upload Characters"
            onFileUpload={handleCharacterUpload}
            multiple={true}
            color="pink"
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
        />

        {generatedThumbnails.length > 0 && (
          <ThumbnailPreview thumbnails={generatedThumbnails} />
        )}
      </main>
    </div>
  );
}

export default App;