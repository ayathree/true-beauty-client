import { useEffect, useRef, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as blazeface from '@tensorflow-models/blazeface';


const SkinToneAnalyzer = () => {
     const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendInitialized, setBackendInitialized] = useState(false);
  const fileInputRef = useRef();
  const canvasRef = useRef();

  // Initialize TensorFlow backend when component mounts
  useEffect(() => {
    async function initTF() {
      try {
        // Set the backend (WebGL is faster but CPU works everywhere)
        await tf.setBackend('webgl'); // or 'cpu' if WebGL fails
        await tf.ready(); // Wait for TensorFlow.js to be ready
        setBackendInitialized(true);
        console.log('TensorFlow.js backend:', tf.getBackend());
      } catch (error) {
        console.error('Failed to initialize TensorFlow:', error);
      }
    }
    initTF();
  }, []);

  // Step 2: Load model and detect skin tone
  const analyzeSkinTone = async () => {
      if (!backendInitialized) {
          alert('TensorFlow.js is still loading. Please wait...');
          return;
        }
        setLoading(true);
    
    try {
        
      // 1. Load the face detection model
      const model = await blazeface.load();
      
      // 2. Detect face in the image
      const img = document.getElementById('preview');
      const predictions = await model.estimateFaces(img, false);
      
      if (predictions.length === 0) {
        throw new Error('No face detected');
      }

      // 3. Simple skin tone analysis (get average color of face)
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(img, 0, 0, 200, 200);
      
      // Get center face area (avoid hair/background)
      const face = predictions[0].topLeft.slice();
      const width = predictions[0].bottomRight[0] - face[0];
      const height = predictions[0].bottomRight[1] - face[1];
      
      const centerX = face[0] + width * 0.3;
      const centerY = face[1] + height * 0.3;
      const sampleSize = width * 0.2;
      
      // Get pixel data
      const pixelData = ctx.getImageData(centerX, centerY, sampleSize, sampleSize).data;
      
      // Calculate average RGB
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < pixelData.length; i += 4) {
        r += pixelData[i];
        g += pixelData[i + 1];
        b += pixelData[i + 2];
      }
      const totalPixels = pixelData.length / 4;
      r = Math.round(r / totalPixels);
      g = Math.round(g / totalPixels);
      b = Math.round(b / totalPixels);
      
      // 4. Determine skin tone category (simplified)
      const skinTone = getSkinToneCategory(r, g, b);
      setResult(skinTone);
      
    } catch (error) {
      console.error(error);
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simple skin tone classifier
  const getSkinToneCategory = (r, g, b) => {
    // Very basic categorization - you can improve this!
    if (r > 200 && g > 180 && b > 160) return 'Fair';
    if (r > 180 && g > 150 && b > 120) return 'Light';
    if (r > 150 && g > 120 && b > 90) return 'Medium';
    if (r > 120 && g > 90 && b > 60) return 'Tan';
    return 'Deep';
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

    return (
       <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Find Your Perfect Foundation Shade</h2>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="mb-4"
      />
      
      {image && (
        <div className="mb-4">
          <img 
            id="preview" 
            src={image} 
            alt="Preview" 
            className="max-w-full h-auto mb-2"
          />
          <button
            onClick={analyzeSkinTone}
            disabled={loading}
            className="bg-pink-500 text-white px-4 py-2 rounded"
          >
            {loading ? 'Analyzing...' : 'Find My Shade'}
          </button>
        </div>
      )}
      
      <canvas ref={canvasRef} style={{ display: 'none' }} width="200" height="200" />
      
      {result && !result.startsWith('Error') && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Your Skin Tone: {result}</h3>
          <p className="mt-2">Recommended foundation shades:</p>
          <ul className="list-disc pl-5 mt-2">
            {getRecommendedShades(result).map((shade) => (
              <li key={shade}>{shade}</li>
            ))}
          </ul>
        </div>
      )}
      
      {result && result.startsWith('Error') && (
        <div className="text-red-500 mt-4">{result}</div>
      )}
    </div>
    );
};
// Mock foundation recommendations
const getRecommendedShades = (skinTone) => {
  const shades = {
    'Fair': ['Porcelain', 'Ivory', 'Vanilla'],
    'Light': ['Buff', 'Sand', 'Beige'],
    'Medium': ['Golden', 'Caramel', 'Honey'],
    'Tan': ['Chestnut', 'Amber', 'Toffee'],
    'Deep': ['Espresso', 'Cocoa', 'Mocha']
  };
  return shades[skinTone] || ['Try our shade finder in store'];
};

export default SkinToneAnalyzer;