import React, { useState, useEffect } from 'react'
import { RiPlantLine } from 'react-icons/ri';
import { FiCloudRain } from 'react-icons/fi';

import img from '../logo512.png'
import DiseasePredictor from '../components/DiseasePredictor';
const crops = [
    { name: 'Wheat', image: img },
    { name: 'Corn', image: img },
    // Add more crops here
];

const Prediction = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState('');
    const [soil, setSoil] = useState('');
    const [selectedCrop, setSelectedCrop] = useState('');
    const [predictedYield, setPredictedYield] = useState('');
    const [showPrediction, setShowPrediction] = useState(false);
    const [alertRain, setAlertRain] = useState(true);

    // Fetch weather data based on location
    useEffect(() => {
        const fetchWeatherData = async () => {
            // Fetch weather data based on location using API
            // Set the weather state
        };

        fetchWeatherData();
    }, [location]);

    // Handle crop selection
    const handleCropSelect = (crop) => {
        setSelectedCrop(crop);
        setShowPrediction(false);
    };

    // Predict crop yield
    const predictYield = () => {
        // Predict yield based on location, weather, and soil using ML model or algorithm
        // Set the predicted yield state
        setShowPrediction(true);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        predictYield();
    };

    return (
        <div className="container">
            <section>
                <div className="crop-selection">
                    <h2>Select Crop</h2>
                    <div className="crop-list">
                        {crops.map((crop, index) => (
                            <div
                                className={`crop-item ${selectedCrop === crop ? 'selected' : ''}`}
                                key={index}
                                onClick={() => handleCropSelect(crop)}
                            >
                                <img src={crop.image} alt={crop.name} />
                                <span>{crop.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="prediction-form">
                    <h2>Predict Yield</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />

                        <label htmlFor="weather">Weather:</label>
                        <input
                            type="text"
                            id="weather"
                            value={weather}
                            onChange={(e) => setWeather(e.target.value)}
                            required
                        />

                        <label htmlFor="soil">Soil:</label>
                        <input
                            type="text"
                            id="soil"
                            value={soil}
                            onChange={(e) => setSoil(e.target.value)}
                            required
                        />

                        <button type="submit">Predict</button>
                    </form>

                    {showPrediction && (
                        <div className="yield-prediction">
                            <h3>Yield Prediction: {predictedYield}</h3>
                        </div>
                    )}
                </div>
            </section>

            <section>
                <div className="rain-alert">
                    {alertRain ? <FiCloudRain size={30} color="blue" /> : null}
                    <p>Rain Alert: Rain is expected in your area.</p>
                </div>

                <div className="blog-section">
                    {/* Render blog posts */}
                </div>
            </section>
            <section>
                <div className="container">
                    <DiseasePredictor/>
                </div>
            </section>
            <footer>
                <div className="social-icons">
                    <a href="/"><RiPlantLine size={30} /></a>
                    <a href="/"><RiPlantLine size={30} /></a>
                    <a href="/"><RiPlantLine size={30} /></a>
                </div>
                <p>&copy; 2023 Farmers' App. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Prediction