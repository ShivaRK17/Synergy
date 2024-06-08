// DiseasePrediction.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DiseasePrediction = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_DISEASE_API}/predict`, {
        method: 'POST',
        body: formData,
        "headers": {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin":"*"
        },
      });

      if (response.ok) {
        const predictionResult = await response.json();
        console.log(predictionResult);
        setPrediction(predictionResult.class +' '+ predictionResult.confidence + '%');
        setImage(acceptedFiles[0]);
      } else {
        throw new Error('Failed to fetch prediction');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="prediction-container">
    <h2>Potato Leaf Disease Prediction</h2>
    
    <div className="image-dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop an image here, or click to select an image</p>
      )}

      {prediction &&  <div className="result-container">
      {image && (
        <div className="image-preview">
          <h3>Leaf Preview:</h3>
          <img src={URL.createObjectURL(image)} alt="LeafIMG" />
        </div>
      )}
      <h3>Disease Prediction Result:</h3>
      <p>{prediction}</p>
    </div>}
    </div>
    </div>
  );
};

export default DiseasePrediction;
