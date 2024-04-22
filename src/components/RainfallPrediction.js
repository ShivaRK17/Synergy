// RainfallPrediction.js
import React, { useState } from 'react';
// import axios from 'axios';
// import RainfallResult from './RainfallResult';

const RainfallPrediction = () => {
  const [location, setLocation] = useState('');
  const [isRainfall, setIsRainfall] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('YOUR_RAINFALL_PREDICTION_API_URL', {
        location,
      });
      setIsRainfall(response.data.isRainfall);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="prediction-container">
      <h2>Rainfall Prediction</h2>
      <form className="prediction-form" onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button type="submit">Predict</button>
      </form>

      {isRainfall !== null && <div className="result-container">
      <h3>Rainfall Prediction Result:</h3>
      <p>{isRainfall ? 'Rain expected' : 'No rain expected'}</p>
    </div>}
    </div>
  );
};

export default RainfallPrediction;
