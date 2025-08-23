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

  const parsePromptInstructions = (prompt) => {
    const instructions = {
      removeBackground: false,
      backgroundColor: null,
      textColor: '#ffffff',
      textStroke: '#000000',
      fontSize: 60,
      textPosition: 'left',
      characterPosition: 'right',
      characterStyle: 'circle',
      overlay: 0.3,
      effects: [],
      borderColor: null,
      borderWidth: 0,
      characterSize: 'medium'
    };

    const lowerPrompt = prompt.toLowerCase();

    // Background instructions
    if (lowerPrompt.includes('remove background') || lowerPrompt.includes('no background') || lowerPrompt.includes('transparent background')) {
      instructions.removeBackground = true;
    }

    // Background color changes
    const colorMatches = [
      { keywords: ['red background', 'background red'], color: '#ff4444' },
      { keywords: ['blue background', 'background blue'], color: '#4444ff' },
      { keywords: ['green background', 'background green'], color: '#44ff44' },
      { keywords: ['yellow background', 'background yellow'], color: '#ffff44' },
      { keywords: ['purple background', 'background purple'], color: '#8844ff' },
      { keywords: ['pink background', 'background pink'], color: '#ff44ff' },
      { keywords: ['orange background', 'background orange'], color: '#ff8844' },
      { keywords: ['black background', 'background black'], color: '#000000' },
      { keywords: ['white background', 'background white'], color: '#ffffff' },
      { keywords: ['gray background', 'background gray', 'grey background'], color: '#888888' }
    ];

    colorMatches.forEach(match => {
      if (match.keywords.some(keyword => lowerPrompt.includes(keyword))) {
        instructions.backgroundColor = match.color;
      }
    });

    // Text color instructions
    const textColors = [
      { keywords: ['red text', 'text red'], color: '#ff0000' },
      { keywords: ['blue text', 'text blue'], color: '#0066ff' },
      { keywords: ['green text', 'text green'], color: '#00ff00' },
      { keywords: ['yellow text', 'text yellow'], color: '#ffff00' },
      { keywords: ['purple text', 'text purple'], color: '#8800ff' },
      { keywords: ['pink text', 'text pink'], color: '#ff0088' },
      { keywords: ['orange text', 'text orange'], color: '#ff8800' },
      { keywords: ['black text', 'text black'], color: '#000000' },
      { keywords: ['white text', 'text white'], color: '#ffffff' }
    ];

    textColors.forEach(match => {
      if (match.keywords.some(keyword => lowerPrompt.includes(keyword))) {
        instructions.textColor = match.color;
        instructions.textStroke = match.color === '#ffffff' ? '#000000' : '#ffffff';
      }
    });

    // Text size
    if (lowerPrompt.includes('large text') || lowerPrompt.includes('big text')) {
      instructions.fontSize = 80;
    } else if (lowerPrompt.includes('small text') || lowerPrompt.includes('tiny text')) {
      instructions.fontSize = 40;
    }

    // Text position
    if (lowerPrompt.includes('center text') || lowerPrompt.includes('text center')) {
      instructions.textPosition = 'center';
    } else if (lowerPrompt.includes('right text') || lowerPrompt.includes('text right')) {
      instructions.textPosition = 'right';
    }

    // Character position
    if (lowerPrompt.includes('character left') || lowerPrompt.includes('left character')) {
      instructions.characterPosition = 'left';
    } else if (lowerPrompt.includes('character center') || lowerPrompt.includes('center character')) {
      instructions.characterPosition = 'center';
    }

    // Character style
    if (lowerPrompt.includes('square character') || lowerPrompt.includes('rectangular character')) {
      instructions.characterStyle = 'square';
    }

    // Character size
    if (lowerPrompt.includes('large character') || lowerPrompt.includes('big character')) {
      instructions.characterSize = 'large';
    } else if (lowerPrompt.includes('small character') || lowerPrompt.includes('tiny character')) {
      instructions.characterSize = 'small';
    }

    // Overlay effects
    if (lowerPrompt.includes('no overlay') || lowerPrompt.includes('remove overlay')) {
      instructions.overlay = 0;
    } else if (lowerPrompt.includes('strong overlay') || lowerPrompt.includes('dark overlay')) {
      instructions.overlay = 0.6;
    }

    // Border effects
    if (lowerPrompt.includes('red border')) {
      instructions.borderColor = '#ff0000';
      instructions.borderWidth = 5;
    } else if (lowerPrompt.includes('blue border')) {
      instructions.borderColor = '#0000ff';
      instructions.borderWidth = 5;
    } else if (lowerPrompt.includes('gold border') || lowerPrompt.includes('yellow border')) {
      instructions.borderColor = '#ffd700';
      instructions.borderWidth = 5;
    }

    // Effects
    if (lowerPrompt.includes('glow') || lowerPrompt.includes('glowing')) {
      instructions.effects.push('glow');
    }
    if (lowerPrompt.includes('shadow')) {
      instructions.effects.push('shadow');
    }
    if (lowerPrompt.includes('3d') || lowerPrompt.includes('3d effect')) {
      instructions.effects.push('3d');
    }

    return instructions;
  };

  const createThumbnailCanvas = (backgroundImg, characterImgs, title, prompt, index) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to YouTube thumbnail size
      canvas.width = 1280;
      canvas.height = 720;
      
      // Parse prompt instructions
      const instructions = parsePromptInstructions(prompt);
      
      // Handle background
      if (instructions.removeBackground) {
        // Transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else if (instructions.backgroundColor) {
        // Custom background color
        ctx.fillStyle = instructions.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (backgroundImg) {
        // Use uploaded background image
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
      } else {
        // Default gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const colors = [
          ['#667eea', '#764ba2'],
          ['#f093fb', '#f5576c'],
          ['#4facfe', '#00f2fe'],
          ['#fa709a', '#fee140']
        ];
        const colorPair = colors[index % colors.length];
        gradient.addColorStop(0, colorPair[0]);
        gradient.addColorStop(1, colorPair[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Add overlay if specified
      if (instructions.overlay > 0 && !instructions.removeBackground) {
        ctx.fillStyle = `rgba(0, 0, 0, ${instructions.overlay})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Calculate character size based on instructions
      let charSizeMultiplier = 0.4;
      if (instructions.characterSize === 'large') charSizeMultiplier = 0.6;
      if (instructions.characterSize === 'small') charSizeMultiplier = 0.25;
      
      // Draw character images if available
      if (characterImgs && characterImgs.length > 0) {
        const charImg = characterImgs[index % characterImgs.length];
        const charSize = Math.min(canvas.width * charSizeMultiplier, canvas.height * 0.8);
        
        let charX, charY;
        
        // Position character based on instructions
        if (instructions.characterPosition === 'left') {
          charX = 50;
          charY = (canvas.height - charSize) / 2;
        } else if (instructions.characterPosition === 'center') {
          charX = (canvas.width - charSize) / 2;
          charY = (canvas.height - charSize) / 2;
        } else { // right (default)
          charX = canvas.width - charSize - 50;
          charY = (canvas.height - charSize) / 2;
        }
        
        ctx.save();
        
        if (instructions.characterStyle === 'circle') {
          // Circular character
          ctx.beginPath();
          ctx.arc(charX + charSize/2, charY + charSize/2, charSize/2, 0, 2 * Math.PI);
          ctx.clip();
        }
        
        ctx.drawImage(charImg, charX, charY, charSize, charSize);
        ctx.restore();
        
        // Add border to character if specified
        if (instructions.borderColor) {
          ctx.strokeStyle = instructions.borderColor;
          ctx.lineWidth = instructions.borderWidth;
          if (instructions.characterStyle === 'circle') {
            ctx.beginPath();
            ctx.arc(charX + charSize/2, charY + charSize/2, charSize/2, 0, 2 * Math.PI);
            ctx.stroke();
          } else {
            ctx.strokeRect(charX, charY, charSize, charSize);
          }
        }
      }
      
      // Setup text properties
      ctx.fillStyle = instructions.textColor;
      ctx.strokeStyle = instructions.textStroke;
      ctx.lineWidth = 3;
      ctx.font = `bold ${instructions.fontSize}px Arial, sans-serif`;
      
      // Set text alignment based on position
      if (instructions.textPosition === 'center') {
        ctx.textAlign = 'center';
      } else if (instructions.textPosition === 'right') {
        ctx.textAlign = 'right';
      } else {
        ctx.textAlign = 'left';
      }
      
      // Add text effects
      if (instructions.effects.includes('glow')) {
        ctx.shadowColor = instructions.textColor;
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
      
      if (instructions.effects.includes('shadow')) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
      }
      
      // Wrap text if too long
      const words = title.split(' ');
      const lines = [];
      let currentLine = '';
      const maxWidth = canvas.width - 100;
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
      
      // Calculate text position
      const lineHeight = instructions.fontSize * 1.2;
      const totalTextHeight = lines.length * lineHeight;
      let startY = (canvas.height - totalTextHeight) / 2 + instructions.fontSize;
      
      // Adjust text position if character is in center
      if (instructions.characterPosition === 'center' && characterImgs && characterImgs.length > 0) {
        startY = canvas.height - (lines.length * lineHeight) - 50;
      }
      
      // Draw text lines
      lines.forEach((line, i) => {
        const y = startY + (i * lineHeight);
        let x;
        
        if (instructions.textPosition === 'center') {
          x = canvas.width / 2;
        } else if (instructions.textPosition === 'right') {
          x = canvas.width - 50;
        } else {
          x = 50;
        }
        
        // Draw 3D effect if requested
        if (instructions.effects.includes('3d')) {
          ctx.fillStyle = '#000000';
          ctx.fillText(line, x + 3, y + 3);
          ctx.fillStyle = instructions.textColor;
        }
        
        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
      });
      
      // Reset shadow effects
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Add overall border if specified
      if (instructions.borderColor && instructions.borderWidth > 0) {
        ctx.strokeStyle = instructions.borderColor;
        ctx.lineWidth = instructions.borderWidth;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
      }
      
      // Convert canvas to blob and resolve
      canvas.toBlob(resolve, 'image/png');
    });
  };

  const loadImageFromFile = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => resolve(img);
        img.src = e.target.result;
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleGenerateThumbnails = async () => {
    if (!thumbnailTitle.trim()) {
      alert('Please enter a thumbnail title');
      return;
    }

    setIsLoading(true);
    
    try {
      // Load uploaded images
      let backgroundImg = null;
      let characterImgs = [];
      
      if (backgroundImage) {
        backgroundImg = await loadImageFromFile(backgroundImage);
      }
      
      if (characterImages.length > 0) {
        characterImgs = await Promise.all(
          characterImages.map(file => loadImageFromFile(file))
        );
      }
      
      // Generate 4 different thumbnails
      const thumbnailPromises = [];
      for (let i = 0; i < 4; i++) {
        thumbnailPromises.push(
          createThumbnailCanvas(backgroundImg, characterImgs, thumbnailTitle, additionalPrompt, i)
        );
      }
      
      const thumbnailBlobs = await Promise.all(thumbnailPromises);
      
      // Create thumbnail objects with blob URLs
      const thumbnails = thumbnailBlobs.map((blob, index) => ({
        id: index + 1,
        title: thumbnailTitle,
        url: URL.createObjectURL(blob),
        blob: blob
      }));
      
      setGeneratedThumbnails(thumbnails);
    } catch (error) {
      console.error('Error generating thumbnails:', error);
      alert('Error generating thumbnails. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup blob URLs when component unmounts or thumbnails change
  React.useEffect(() => {
    return () => {
      generatedThumbnails.forEach(thumbnail => {
        if (thumbnail.url && thumbnail.url.startsWith('blob:')) {
          URL.revokeObjectURL(thumbnail.url);
        }
      });
    };
  }, [generatedThumbnails]);

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
            uploadedFile={backgroundImage}
          />
          <UploadSection
            title="Upload Characters"
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
        />

        {generatedThumbnails.length > 0 && (
          <ThumbnailPreview thumbnails={generatedThumbnails} />
        )}
      </main>
    </div>
  );
}

export default App;